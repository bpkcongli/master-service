// import Address from '../../valueObjects/Address';
// import ContactPerson from '../../valueObjects/ContactPerson';
// import LicenseInformation from '../../valueObjects/LicenseInformation';
// import Licenses from '../../valueObjects/Licenses';
import Supplier from '../Supplier';

describe('Supplier entity', () => {
  /**
   * - Should throw an error when instantiating without payload
   * - Should throw an error when instantiating with the required payload
   *   but mandatory field is missing
   * - Should throw an error when the required payload have a mandatory field
   *   but the data type is not match with the schema
   * - Should throw an error when the required payload have a non-mandatory
   *   field but the data type is not match with the schema
   * - When instantiating with the required payload and correct schema even
   *   though a non-mandatory field is missing,
   *   - Should create a Supplier object
   *   - Value from fields on a Supplier object can be changed with the
   *     appropriate setter
   *
   * Supplier payload have some mandatory fields:
   * name, address, city, province, postalCode, phoneNumber
   *
   * Address payload have some non-mandatory fields:
   * faxNumber, email, website, pharmacyLicenseId, pharmacyLicenseValidityPeriod
   * medicalDevicesLicenseId, medicalDevicesLicenseValidityPeriod,
   * contactPersonName, contactPersonPhoneNumber
   */
  it('Should throw an error when instantiating without payload', () => {
    expect(() => new Supplier(null)).toThrowError('SUPPLIER.NO_PAYLOAD');
  });

  it(`Should throw an error when instantiating with the required payload but 
    mandatory field is missing`, () => {
    const payload = {
      name: 'Anugrah Argon Medica. PT',
      address: 'Jl. Pinang-Kunciran No.31, RT.002/RW.007, Kunciran',
      city: 'Kota Tangerang',
      province: 'Banten',
      postalCode: '15144',
    };

    expect(() => new Supplier(payload))
        .toThrowError('SUPPLIER.NOT_CONTAIN_MANDATORY_FIELD');
  });

  it(`Should throw an error when the required payload have a mandatory field 
    but the data type is not match with the schema`, () => {
    const payload = {
      name: 'Anugrah Argon Medica. PT',
      address: 'Jl. Pinang-Kunciran No.31, RT.002/RW.007, Kunciran',
      city: 'Kota Tangerang',
      province: 'Banten',
      postalCode: '15144',
      phoneNumber: undefined,
    };

    expect(() => new Supplier(payload))
        .toThrowError('SUPPLIER.DATA_TYPE_NOT_MATCH');
  });

  it(`Should throw an error when the required payload have a non-mandatory field
    but the data type is not match with the schema`, () => {
    const payload = {
      name: 'Anugrah Argon Medica. PT',
      address: 'Jl. Pinang-Kunciran No.31, RT.002/RW.007, Kunciran',
      city: 'Kota Tangerang',
      province: 'Banten',
      postalCode: '15144',
      phoneNumber: '021-22225555',
      faxNumber: 1234567890,
    };

    expect(() => new Supplier(payload))
        .toThrowError('SUPPLIER.DATA_TYPE_NOT_MATCH');
  });

  describe(`When instantiating with the required payload and correct schema
    even though a non-mandatory field is missing`, () => {
    let supplier: Supplier;
    const payload = {
      name: 'Anugrah Argon Medica. PT',
      address: 'Jl. Pinang-Kunciran No.31, RT.002/RW.007, Kunciran',
      city: 'Kota Tangerang',
      province: 'Banten',
      postalCode: '15144',
      phoneNumber: '021-22225555',
    };

    beforeAll(() => {
      supplier = new Supplier(payload);
    });

    it('Should create a Supplier object', () => {
      expect(supplier.name).toEqual(payload.name);
      expect(supplier.address.detail).toEqual(payload.address);
      expect(supplier.address.city).toEqual(payload.city);
      expect(supplier.address.province).toEqual(payload.province);
      expect(supplier.address.postalCode).toEqual(payload.postalCode);
      expect(supplier.phoneNumber).toEqual(payload.phoneNumber);
      expect(supplier.faxNumber).toEqual('');
      expect(supplier.email).toEqual('');
      expect(supplier.website).toEqual('');
      expect(supplier.licenses.pharmacy.licenseId).toEqual('');
      expect(supplier.licenses.pharmacy.validityPeriod).toEqual('');
      expect(supplier.licenses.medicalDevices.licenseId).toEqual('');
      expect(supplier.licenses.medicalDevices.validityPeriod).toEqual('');
      expect(supplier.contactPerson.name).toEqual('');
      expect(supplier.contactPerson.phoneNumber).toEqual('');
    });

    it(`Value from fields on a Supplier object can be changed with the 
      appropriate setter`, () => {
      const newPayload = {
        name: 'PT. Anugerah Pharmindo Lestari',
        address: 'Tower 10th Floor Cowell Tower, Jl. Senen Raya No.135, RW.2',
        city: 'Kota Jakarta Pusat',
        province: 'DKI Jakarta',
        postalCode: '10410',
        phoneNumber: '021-5636588',
        faxNumber: '021-5636588',
        email: 'info@apl.com',
        website: 'https://www.anugerah-pharmindo.com',
        pharmacyLicenseId: 'PBF-001-0003',
        pharmacyLicenseValidityPeriod: '02-01-2023',
        medicalDevicesLicenseId: 'PBAK-001-0003',
        medicalDevicesLicenseValidityPeriod: '02-01-2023',
        contactPersonName: 'Ragil',
        contactPersonPhoneNumber: '089897969594',
      };

      expect(() => supplier.changeInfo(newPayload)).not.toThrowError();

      expect(supplier.faxNumber).toEqual(newPayload.faxNumber);
      expect(supplier.email).toEqual(newPayload.email);
      expect(supplier.website).toEqual(newPayload.website);
      expect(supplier.licenses.pharmacy.licenseId)
          .toEqual(newPayload.pharmacyLicenseId);
      expect(supplier.licenses.pharmacy.validityPeriod)
          .toEqual(newPayload.pharmacyLicenseValidityPeriod);
      expect(supplier.licenses.medicalDevices.licenseId)
          .toEqual(newPayload.medicalDevicesLicenseId);
      expect(supplier.licenses.medicalDevices.validityPeriod)
          .toEqual(newPayload.medicalDevicesLicenseValidityPeriod);
      expect(supplier.contactPerson.name).toEqual(newPayload.contactPersonName);
      expect(supplier.contactPerson.phoneNumber)
          .toEqual(newPayload.contactPersonPhoneNumber);
    });
  });
});
