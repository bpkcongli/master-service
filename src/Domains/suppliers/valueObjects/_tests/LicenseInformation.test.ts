import LicenseInformation from '../LicenseInformation';

describe('LicenseInformation class', () => {
  /**
   * Test Cases:
   * - Should throw an error when instantiating without payload
   * - Should not throw an error when instantiating with the required payload
   *   but other non-mandatory field is missing
   * - Should throw an error when the required payload have a field
   *   but the data type is not match with the schema
   * - When instantiating with the required payload and appropriate
   *   field,
   *   - Should create a LicenseInformation object
   *   - Value from fields on a LicenseInformation object can be changed
   *     with the appropriate setter
   *
   * LicenseInformation payload doesn't have mandatory field
   *
   * LicenseInformation payload have some non-mandatory fields:
   * licenseId, validityPeriod
   */
  it('Should throw an error when instantiating without payload', () => {
    expect(() => new LicenseInformation(null))
        .toThrowError('LICENSE_INFORMATION.NO_PAYLOAD');
  });

  it(`Should not throw an error when instantiating with the required payload but
    other non-mandatory field is missing`, () => {
    const licenseInformation = new LicenseInformation({});
    expect(licenseInformation.licenseId).toEqual('');
    expect(licenseInformation.validityPeriod).toEqual('');
  });

  it(`Should throw an error when the required payload have a field but the 
    data type is not match with the schema`, () => {
    const payload = {
      licenseId: 'PBF-001-0001',
      validityPeriod: true,
    };

    expect(() => new LicenseInformation(payload))
        .toThrowError('LICENSE_INFORMATION.DATA_TYPE_NOT_MATCH');
  });

  describe(`When instantiating with the required payload and appropriate 
    field`, () => {
    let licenseInformation: LicenseInformation;
    const payload = {
      licenseId: 'PBF-001-0001',
      validityPeriod: '01-01-2023',
    };

    beforeAll(() => {
      licenseInformation = new LicenseInformation(payload);
    });

    it('Should create a LicenseInformation object', () => {
      expect(licenseInformation.licenseId).toEqual(payload.licenseId);
      expect(licenseInformation.validityPeriod).toEqual(payload.validityPeriod);
    });

    it(`Value from fields on a LicenseInformation object can be changed 
      with the appropriate setter`, () => {
      const newPayload = {
        licenseId: 'PBF-001-0002',
        validityPeriod: '01-01-2024',
      };

      licenseInformation.licenseId = newPayload.licenseId;
      licenseInformation.validityPeriod = newPayload.validityPeriod;

      expect(licenseInformation.licenseId).toEqual(newPayload.licenseId);
      expect(licenseInformation.validityPeriod)
          .toEqual(newPayload.validityPeriod);
    });
  });
});
