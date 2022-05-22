import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import {ACCESS_TOKEN_KEY, COOKIE_NAME} from '../../../Commons/config';
import SupplierDO from '../../databases/mongodb/models/SupplierDO';
import createServer from '../createServer';
import container from '../../container';
const api = supertest(createServer(container));

describe('HTTP Server', () => {
  /**
   * Test Cases:
   * - POST /api/v1/masters/suppliers
   *   - Without authentication, should response with 401 Unauthorized
   *   - Without required permission, should response with 403 Forbidden
   *   - With required permission and invalid payload, should response with
   *     400 Bad Request
   *   - With required permission and correct payload, should response with
   *     201 Created, a new entity must persist in the database
   */
  describe('POST /api/v1/masters/suppliers', () => {
    const cookieBuilder = (token: string) => {
      return `_bmp_sid=${token}; ` +
        'Domain=bmpwholesalersystem.com; Path=/; HttpOnly';
    };

    const payload = {
      name: 'PT. Anugerah Pharmindo Lestari',
      address: 'Tower 10th Floor Cowell Tower, Jl. Senen Raya No.135, RW.2',
      city: 'Kota Jakarta Pusat',
      province: 'DKI Jakarta',
      postalCode: '10410',
      phoneNumber: '021-5636588',
    };

    it(`Without authentication, should response with
      401 Unauthorized`, async () => {
      const res = await api.post('/api/v1/masters/suppliers')
          .send({...payload})
          .expect(401)
          .expect('Content-Type', 'application/json; charset=utf-8');

      const {status, message} = res.body;
      expect(status).toEqual('fail');
      expect(message).toEqual('Maaf, Anda membutuhkan kredensial untuk ' +
        'melakukan operasi ini.');
    });

    it(`Without required permission, should response with
      403 Forbidden`, async () => {
      const token = jwt
          .sign({id: 'user-3f8d3db53231'}, String(ACCESS_TOKEN_KEY));

      const res = await api.post('/api/v1/masters/suppliers')
          .set('Cookie', [`${cookieBuilder(token)}`])
          .send({...payload})
          .expect(403)
          .expect('Content-Type', 'application/json; charset=utf-8');

      const {status, message, details} = res.body;
      expect(status).toEqual('fail');
      expect(message).toEqual('Maaf, Anda tidak memiliki otorisasi untuk ' +
        'melakukan operasi ini.');
      expect(details).toHaveProperty('message');
      expect(details.message).toContain('Required permission');
    });

    it(`With required permission and invalid payload, should response with
      400 Bad Request`, async () => {
      const token = jwt
          .sign({id: 'user-3f8d3db53232'}, String(ACCESS_TOKEN_KEY));

      const res = await api.post('/api/v1/masters/suppliers')
          .set('Cookie', [`${COOKIE_NAME}=${token}`])
          .send({...payload, phoneNumber: undefined})
          .expect(400)
          .expect('Content-Type', 'application/json; charset=utf-8');

      const {status, message, details} = res.body;
      expect(status).toEqual('fail');
      expect(message).toEqual('Maaf, server tidak dapat memproses ' +
        'permintaan Anda.');
      expect(details).toHaveProperty('message');
      expect(details.message).toContain('ValidationError');
    });

    it(`With required permission and correct payload, should response with 
      201 Created, a new entity must persist in the database`, async () => {
      const token = jwt
          .sign({id: 'user-3f8d3db53232'}, String(ACCESS_TOKEN_KEY));

      const res = await api.post('/api/v1/masters/suppliers')
          .set('Cookie', [`${COOKIE_NAME}=${token}`])
          .send({...payload})
          .expect(201)
          .expect('Content-Type', 'application/json; charset=utf-8');

      const {status, message} = res.body;
      expect(status).toEqual('success');
      expect(message).toEqual('Supplier baru berhasil ditambahkan.');

      const savedSupplier = await SupplierDO.findOne();
      expect(typeof savedSupplier.id).toBe('string');
      expect(savedSupplier.name).toEqual(payload.name);
      expect(savedSupplier.address).toStrictEqual({
        detail: payload.address,
        city: payload.city,
        province: payload.province,
        postalCode: payload.postalCode,
      });
      expect(savedSupplier.phoneNumber).toEqual(payload.phoneNumber);
    });

    afterEach(async () => {
      await SupplierDO.deleteMany();
    });
  });
});
