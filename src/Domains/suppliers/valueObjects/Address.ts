import SchemaChecker from '@conglicorp/schema-checker';

export default class Address {
  private _mandatorySchema: Record<string, any> = {
    detail: 'string',
    city: 'string',
    province: 'string',
    postalCode: 'string',
  };
  private _className = 'ADDRESS';
  private _schemaChecker: SchemaChecker;
  private _detail: string;
  private _city: string;
  private _province: string;
  private _postalCode: string;

  constructor(payload: any) {
    this._schemaChecker = new SchemaChecker(this._mandatorySchema);
    this._verifyPayload(payload);

    const {detail, city, province, postalCode} = payload;
    this._detail = detail;
    this._city = city;
    this._province = province;
    this._postalCode = postalCode;
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

  get detail(): string {
    return this._detail;
  }

  set detail(val: string) {
    this._detail = val;
  }

  get city(): string {
    return this._city;
  }

  set city(val: string) {
    this._city = val;
  }

  get province(): string {
    return this._province;
  }

  set province(val: string) {
    this._province = val;
  }

  get postalCode(): string {
    return this._postalCode;
  }

  set postalCode(val: string) {
    this._postalCode = val;
  }
}
