import SupplierValidatorJoi from '../SupplierValidatorJoi';

describe('SupplierValidatorJoi', () => {
  /**
   * Test Cases:
   * - Should correctly validate the add supplier request payload so it match
   *   with the appropriated schema.
   */
  const badPayloads: Record<string, any>[] = [];
  const badPayloadVariations: Record<string, any[]> = {
    name: [11],
    address: [true],
    city: [false],
    province: [11],
    postalCode: [15138, '123456'],
    phoneNumber: [1234567890, 'not phone number'],
    faxNumber: [1234567890, 'not phone number'],
    email: [true, 'not email'],
    website: [false, 'not website url'],
    pharmacyLicenseId: [11],
    pharmacyLicenseValidityPeriod: [11, 'not iso date string'],
    medicalDevicesLicenseId: [true],
    medicalDevicesLicenseValidityPeriod: [true, 'not iso date string'],
    contactPersonName: [false],
    contactPersonPhoneNumber: [1234567890, 'not phone number'],
  };
  const correctPayload: Record<string, string> = {
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
    pharmacyLicenseValidityPeriod: '2023-01-31T00:00:00.000Z',
    medicalDevicesLicenseId: 'PBAK-001-0003',
    medicalDevicesLicenseValidityPeriod: '2023-01-31T00:00:00.000Z',
    contactPersonName: 'Ragil',
    contactPersonPhoneNumber: '089897969594',
  };
  const requiredFields = [
    'name', 'address', 'city', 'province', 'postalCode', 'phoneNumber'];

  Object.keys(correctPayload).forEach((key) => {
    if (requiredFields.includes(key)) {
      badPayloads.push({...correctPayload, [key]: undefined});
    }

    badPayloadVariations[key].forEach((val) => {
      badPayloads.push({
        ...correctPayload,
        [key]: val,
      });
    });
  });

  it(`Should correctly validate the add supplier request payload so it match 
    with the appropriated schema.`, () => {
    const supplierValidatorJoi = new SupplierValidatorJoi();

    expect(supplierValidatorJoi).toHaveProperty('validateAddSupplierPayload');
    badPayloads.forEach((badPayload) => {
      expect(() => supplierValidatorJoi.validateAddSupplierPayload(badPayload))
          .toThrowError();
    });
  });
});
