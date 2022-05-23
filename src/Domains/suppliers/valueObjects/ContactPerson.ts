import SchemaChecker from '@conglicorp/schema-checker';

export default class ContactPerson {
  private _nonMandatorySchema: Record<string, any> = {
    name: 'string',
    phoneNumber: 'string',
  };
  private _schemaChecker: SchemaChecker;
  private _className = 'CONTACT_PERSON';
  private _name: string;
  private _phoneNumber: string;

  constructor(payload: any) {
    this._schemaChecker =
      new SchemaChecker(undefined, this._nonMandatorySchema);
    this._verifyPayload(payload);

    const {name, phoneNumber} = payload;
    this._name = name || '';
    this._phoneNumber = phoneNumber || '';
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

  get name(): string {
    return this._name;
  }

  set name(val: string) {
    this._name = val;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(val: string) {
    this._phoneNumber = val;
  }
}
