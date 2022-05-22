import SupplierRepositoryMongo from '../SupplierRepositoryMongo';
import {createConnection} from '../../databases/mongodb/createConnection';
import Supplier from '../../../Domains/suppliers/entities/Supplier';
import SupplierDO from '../../databases/mongodb/models/SupplierDO';

describe('SupplierRepositoryMongo implementation', () => {
  /**
   * Test Cases:
   * - Should have method addSupplier() and should successfully saved user
   *   entity on the database
   */
  it(`Should have method addSupplier() and should successfully saved supplier 
    entity on the database`, async () => {
    createConnection();

    const payload = {
      id: 'supplier-37b27a8ff501',
      name: 'Anugrah Argon Medica. PT',
      address: 'Jl. Pinang-Kunciran No.31, RT.002/RW.007, Kunciran',
      city: 'Kota Tangerang',
      province: 'Banten',
      postalCode: '15144',
      phoneNumber: '021-22225555',
    };
    const supplier = new Supplier(payload);

    const supplierRepositoryMongo = new SupplierRepositoryMongo();

    expect(supplierRepositoryMongo).toHaveProperty('addSupplier');
    await supplierRepositoryMongo.addSupplier(supplier);

    const savedSupplier = await SupplierDO.findOne({id: payload.id});
    expect(savedSupplier.id).toEqual(payload.id);
    expect(savedSupplier.name).toEqual(payload.name);
    expect(savedSupplier.address).toStrictEqual({
      detail: payload.address,
      city: payload.city,
      province: payload.province,
      postalCode: payload.postalCode,
    });
    expect(savedSupplier.phoneNumber).toEqual(payload.phoneNumber);
    expect(savedSupplier.faxNumber).toEqual('');
    expect(savedSupplier.email).toEqual('');
    expect(savedSupplier.website).toEqual('');
    expect(savedSupplier.licenses).toStrictEqual({
      pharmacy: {
        licenseId: '',
        validityPeriod: '',
      },
      medicalDevices: {
        licenseId: '',
        validityPeriod: '',
      },
    });
    expect(savedSupplier.contactPerson).toStrictEqual({
      name: '',
      phoneNumber: '',
    });
  });

  afterAll(async () => {
    await SupplierDO.deleteMany();
  });
});
