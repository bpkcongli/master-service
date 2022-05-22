import Address from '../Address';

describe('Address class', () => {
  /**
   * Test Cases:
   * - Should throw an error when instantiating without payload
   * - Should throw an error when instantiating with the required payload
   *   but mandatory field is missing
   * - Should throw an error when the required payload have a field
   *   but the data type is not match with the schema
   * - When instantiating with the required payload and appropriate
   *   field,
   *   - Should create an Address object
   *   - Value from fields on an Address object can be changed with the
   *     appropriate setter
   *
   * Address payload have some mandatory fields:
   * detail, city, province, postalCode
   *
   * Address payload doesn't have non-mandatory field
   */
  it('Should throw an error when instantiating without payload', () => {
    expect(() => new Address(null)).toThrowError('ADDRESS.NO_PAYLOAD');
  });

  it(`Should throw an error when instantiating with the required payload but 
    mandatory field is missing`, () => {
    const payload = {
      detail: 'Jl. Pinang-Kunciran No.31, RT.002/RW.007, Kunciran',
      city: 'Kota Tangerang',
      province: 'Banten',
    };

    expect(() => new Address(payload))
        .toThrowError('ADDRESS.NOT_CONTAIN_MANDATORY_FIELD');
  });

  it(`Should throw an error when the required payload have a field but the 
    data type is not match with the schema`, () => {
    const payload = {
      detail: 'Jl. Pinang-Kunciran No.31, RT.002/RW.007, Kunciran',
      city: 'Kota Tangerang',
      province: 'Banten',
      postalCode: 15144,
    };

    expect(() => new Address(payload))
        .toThrowError('ADDRESS.DATA_TYPE_NOT_MATCH');
  });

  describe(`When instantiating with the required payload and appropriate 
    field`, () => {
    let address: Address;
    const payload = {
      detail: 'Jl. Pinang-Kunciran No.31, RT.002/RW.007, Kunciran',
      city: 'Kota Tangerang',
      province: 'Banten',
      postalCode: '15144',
    };

    beforeAll(() => {
      address = new Address(payload);
    });

    it('Should create an Address object', () => {
      expect(address.detail).toEqual(payload.detail);
      expect(address.city).toEqual(payload.city);
      expect(address.province).toEqual(payload.province);
      expect(address.postalCode).toEqual(payload.postalCode);
    });

    it(`Value from fields on an Address object can be changed with the 
    appropriate setter`, () => {
      const newPayload = {
        detail: 'Tower 10th Floor Cowell Tower, Jl. Senen Raya No.135, RW.2',
        city: 'Kota Jakarta Pusat',
        province: 'DKI Jakarta',
        postalCode: '10410',
      };

      address.detail = newPayload.detail;
      address.city = newPayload.city;
      address.province = newPayload.province;
      address.postalCode = newPayload.postalCode;

      expect(address.detail).toEqual(newPayload.detail);
      expect(address.city).toEqual(newPayload.city);
      expect(address.province).toEqual(newPayload.province);
      expect(address.postalCode).toEqual(newPayload.postalCode);
    });
  });
});
