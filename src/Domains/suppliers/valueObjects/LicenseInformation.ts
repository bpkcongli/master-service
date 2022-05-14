import SchemaChecker from './SchemaChecker';

export default class LicenseInformation {
  private _nonMandatorySchema: Record<string, any> = {
    licenseId: 'string',
    validityPeriod: 'string',
  };
  private _schemaChecker: SchemaChecker;
  private _className = 'LICENSE_INFORMATION';
  private _licenseId: string;
  private _validityPeriod: string;

  constructor(payload: any) {
    this._schemaChecker =
      new SchemaChecker(undefined, this._nonMandatorySchema);
    this._verifyPayload(payload);

    const {licenseId, validityPeriod} = payload;
    this._licenseId = licenseId || '';
    this._validityPeriod = validityPeriod || '';
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

  get licenseId(): string {
    return this._licenseId;
  }

  set licenseId(val: string) {
    this._licenseId = val;
  }

  get validityPeriod(): string {
    return this._validityPeriod;
  }

  set validityPeriod(val: string) {
    this._validityPeriod = val;
  }
}
