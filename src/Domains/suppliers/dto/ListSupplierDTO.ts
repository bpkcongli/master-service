import SchemaChecker from '../valueObjects/SchemaChecker';
import ContactPerson from '../valueObjects/ContactPerson';

interface AddressDTO {
  detail: string;
  city: string;
  province: string;
}

export default class ListSupplierDTO {
  private _mandatorySchema: Record<string, string> = {
    id: 'string',
    name: 'string',
    address: 'string',
    city: 'string',
    province: 'string',
    phoneNumber: 'string',
    contactPersonName: 'string',
    contactPersonPhoneNumber: 'string',
  };
  private _schemaChecker: SchemaChecker;
  private _className = 'LIST_SUPPLIER_DTO';
  private _id: string;
  private _name: string;
  private _address: AddressDTO;
  private _phoneNumber: string;
  private _contactPerson: ContactPerson;

  constructor(payload: any) {
    this._schemaChecker = new SchemaChecker(this._mandatorySchema);
    this._verifyPayload(payload);

    const {
      id,
      name,
      address,
      city,
      province,
      phoneNumber,
      contactPersonName,
      contactPersonPhoneNumber,
    } = payload;

    this._id = id;
    this._name = name;
    this._address = {
      detail: address,
      city,
      province,
    };
    this._phoneNumber = phoneNumber;
    this._contactPerson = new ContactPerson({
      name: contactPersonName,
      phoneNumber: contactPersonPhoneNumber,
    });
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

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get address(): AddressDTO {
    return this._address;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  get contactPerson(): ContactPerson {
    return this._contactPerson;
  }
}
