import Licenses from '../Licenses';
import LicenseInformation from '../LicenseInformation';

describe('Licenses class', () => {
  /**
   * Test Cases:
   * - Should throw an error when instantiating without payload
   * - Should not throw an error when instantiating with the required payload
   *   but other non-mandatory field is missing
   * - Should throw an error when the required payload have a field
   *   but the data type is not match with the schema
   * - When instantiating with the required payload and appropriate
   *   field,
   *   - Should create a Licenses object
   *   - Value from fields on a Licenses object can be changed
   *     with the appropriate setter
   *
   * Licenses payload doesn't have mandatory field
   *
   * Licenses payload have some non-mandatory fields:
   * pharmacy, medicalDevices
   */
  it('Should throw an error when instantiating without payload', () => {
    expect(() => new Licenses(null))
        .toThrowError('LICENSES.NO_PAYLOAD');
  });

  it(`Should not throw an error when instantiating with the required payload
    but other non-mandatory field is missing`, () => {
    const licenses = new Licenses({});
    expect(licenses.pharmacy).toStrictEqual(new LicenseInformation({}));
    expect(licenses.medicalDevices).toStrictEqual(new LicenseInformation({}));
  });

  it(`Should throw an error when the required payload have a field but the 
    data type is not match with the schema`, () => {
    const payload = {
      pharmacy: new LicenseInformation({
        licenseId: 'PBF-001-0001',
        validityPeriod: '01-01-2023',
      }),
      medicalDevices: {
        licenseId: 'PBAK-001-0001',
        validityPeriod: '01-01-2023',
      },
    };

    expect(() => new Licenses(payload))
        .toThrowError('LICENSES.DATA_TYPE_NOT_MATCH');
  });

  describe(`When instantiating with the required payload and appropriate 
    field`, () => {
    let licenses: Licenses;
    const payload = {
      pharmacy: new LicenseInformation({
        licenseId: 'PBF-001-0001',
        validityPeriod: '01-01-2023',
      }),
      medicalDevices: new LicenseInformation({
        licenseId: 'PBAK-001-0001',
        validityPeriod: '01-01-2023',
      }),
    };

    beforeAll(() => {
      licenses = new Licenses(payload);
    });

    it('Should create a Licenses object', () => {
      expect(licenses.pharmacy).toEqual(payload.pharmacy);
      expect(licenses.medicalDevices).toEqual(payload.medicalDevices);
    });

    it(`Value from fields on a Licenses object can be changed
      with the appropriate setter`, () => {
      const newPayload = {
        pharmacy: new LicenseInformation({
          licenseId: 'PBF-001-0002',
          validityPeriod: '01-01-2024',
        }),
        medicalDevices: new LicenseInformation({
          licenseId: 'PBAK-001-0002',
          validityPeriod: '01-01-2024',
        }),
      };

      licenses.pharmacy = newPayload.pharmacy;
      licenses.medicalDevices = newPayload.medicalDevices;

      expect(licenses.pharmacy).toEqual(newPayload.pharmacy);
      expect(licenses.medicalDevices).toEqual(newPayload.medicalDevices);
    });
  });
});
