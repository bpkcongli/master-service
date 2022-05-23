import ListSupplierDTO from '../ListSupplierDTO';

describe('ListSupplierDTO', () => {
  /**
   * Test Cases:
   * - Should throw an error when instantiating without payload
   * - Should throw an error when instantiating with the required payload
   *   but mandatory field is missing
   * - Should throw an error when the required payload have a field
   *   but the data type is not match with the schema
   * - When instantiating with the required payload and appropriate
   *   field, should create a ListSupplierDTO object
   *
   * ListSupplierDTO payload have some mandatory fields:
   * id, name, address, phoneNumber, contactPerson
   *
   * ListSupplierDTO payload doesn't have non-mandatory field
   */
  it('Should throw an error when instantiating without payload', () => {
    expect(() => new ListSupplierDTO(null))
        .toThrowError('LIST_SUPPLIER_DTO.NO_PAYLOAD');
  });

  it(`Should throw an error when instantiating with the required payload but
    mandatory field is missing`, () => {
    const payload = {
      id: 'supplier-37b27a8ff501',
      name: 'Anugrah Argon Medica. PT',
      address: 'Jl. Pinang-Kunciran No.31, RT.002/RW.007, Kunciran',
      city: 'Kota Tangerang',
      province: 'Banten',
      phoneNumber: '021-22225555',
      contactPersonName: 'Ragil',
    };

    expect(() => new ListSupplierDTO(payload))
        .toThrowError('LIST_SUPPLIER_DTO.NOT_CONTAIN_MANDATORY_FIELD');
  });

  it(`Should throw an error when the required payload have a field but the
    data type is not match with the schema`, () => {
    const payload = {
      id: 'supplier-37b27a8ff501',
      name: 'Anugrah Argon Medica. PT',
      address: 'Jl. Pinang-Kunciran No.31, RT.002/RW.007, Kunciran',
      city: 'Kota Tangerang',
      province: 'Banten',
      phoneNumber: '021-22225555',
      contactPersonName: 'Ragil',
      contactPersonPhoneNumber: 1234567890,
    };

    expect(() => new ListSupplierDTO(payload))
        .toThrowError('LIST_SUPPLIER_DTO.DATA_TYPE_NOT_MATCH');
  });

  it(`When instantiating with the required payload and appropriate field,
    should create a ListSupplierDTO object`, () => {
    const payload = {
      id: 'supplier-37b27a8ff501',
      name: 'Anugrah Argon Medica. PT',
      address: 'Jl. Pinang-Kunciran No.31, RT.002/RW.007, Kunciran',
      city: 'Kota Tangerang',
      province: 'Banten',
      phoneNumber: '021-22225555',
      contactPersonName: 'Ragil',
      contactPersonPhoneNumber: '089897969594',
    };

    const listSupplierDTO = new ListSupplierDTO(payload);
    expect(listSupplierDTO.id).toEqual(payload.id);
    expect(listSupplierDTO.name).toEqual(payload.name);
    expect(listSupplierDTO.address.detail).toEqual(payload.address);
    expect(listSupplierDTO.address.city).toEqual(payload.city);
    expect(listSupplierDTO.address.province).toEqual(payload.province);
    expect(listSupplierDTO.phoneNumber).toEqual(payload.phoneNumber);
    expect(listSupplierDTO.contactPerson.name)
        .toEqual(payload.contactPersonName);
    expect(listSupplierDTO.contactPerson.phoneNumber)
        .toEqual(payload.contactPersonPhoneNumber);
  });
});
