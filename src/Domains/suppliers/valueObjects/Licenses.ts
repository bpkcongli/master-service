import SchemaChecker from '@conglicorp/schema-checker';
import LicenseInformation from './LicenseInformation';

export default class Licenses {
  private _nonMandatorySchema: Record<string, any> = {
    pharmacy: LicenseInformation,
    medicalDevices: LicenseInformation,
  };
  private _schemaChecker: SchemaChecker;
  private _className = 'LICENSES';
  private _pharmacy: LicenseInformation;
  private _medicalDevices: LicenseInformation;

  constructor(payload: any) {
    this._schemaChecker =
      new SchemaChecker(undefined, this._nonMandatorySchema);
    this._verifyPayload(payload);

    const {pharmacy, medicalDevices} = payload;
    this._pharmacy = pharmacy || new LicenseInformation({});
    this._medicalDevices = medicalDevices || new LicenseInformation({});
  }

  private _verifyPayload(payload: any) {
    try {
      this._schemaChecker.isHavePayload(payload);
      this._schemaChecker.isPayloadHaveMandatoryField(payload);
      this._schemaChecker.isPayloadHaveAppropriateSchema(payload);
    } catch (err) {
      throw new Error(`${this._className}.${(err as Error).message}`);
    }
  }

  get pharmacy(): LicenseInformation {
    return this._pharmacy;
  }

  set pharmacy(val: LicenseInformation) {
    this._pharmacy = val;
  }

  get medicalDevices(): LicenseInformation {
    return this._medicalDevices;
  }

  set medicalDevices(val: LicenseInformation) {
    this._medicalDevices = val;
  }
}
