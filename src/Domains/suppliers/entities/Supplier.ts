import Address from '../valueObjects/Address';
import Licenses from '../valueObjects/Licenses';
import LicenseInformation from '../valueObjects/LicenseInformation';
import ContactPerson from '../valueObjects/ContactPerson';
import SchemaChecker from '../valueObjects/SchemaChecker';

export default class Supplier {
  private _mandatoryFields: Record<string, any> = {
    name: 'string',
    address: 'string',
    city: 'string',
    province: 'string',
    postalCode: 'string',
    phoneNumber: 'string',
  };
  private _nonMandatoryFields: Record<string, any> = {
    faxNumber: 'string',
    email: 'string',
    website: 'string',
    pharmacyLicenseId: 'string',
    pharmacyLicenseValidityPeriod: 'string',
    medicalDevicesLicenseId: 'string',
    medicalDevicesLicenseValidityPeriod: 'string',
    contactPersonName: 'string',
    contactPersonPhoneNumber: 'string',
  };
  private _schemaChecker: SchemaChecker;
  private _className = 'SUPPLIER';
  private _name: string;
  private _address: Address;
  private _phoneNumber: string;
  private _faxNumber: string;
  private _email: string;
  private _website: string;
  private _licenses: Licenses;
  private _contactPerson: ContactPerson;

  constructor(payload: any) {
    this._schemaChecker =
      new SchemaChecker(this._mandatoryFields, this._nonMandatoryFields);
    this._verifyPayload(payload);
    const {
      name,
      address,
      city,
      province,
      postalCode,
      phoneNumber,
      faxNumber,
      email,
      website,
      pharmacyLicenseId,
      pharmacyLicenseValidityPeriod,
      medicalDevicesLicenseId,
      medicalDevicesLicenseValidityPeriod,
      contactPersonName,
      contactPersonPhoneNumber,
    } = payload;

    this._name = name;
    this._address = new Address({
      detail: address,
      city,
      province,
      postalCode,
    });
    this._phoneNumber = phoneNumber;
    this._faxNumber = faxNumber || '';
    this._email = email || '';
    this._website = website || '';
    this._licenses = new Licenses({
      pharmacy: new LicenseInformation({
        licenseId: pharmacyLicenseId,
        validityPeriod: pharmacyLicenseValidityPeriod,
      }),
      medicalDevices: new LicenseInformation({
        licenseId: medicalDevicesLicenseId,
        validityPeriod: medicalDevicesLicenseValidityPeriod,
      }),
    });
    this._contactPerson = new ContactPerson({
      name: contactPersonName,
      phoneNumber: contactPersonPhoneNumber,
    });
  }

  changeInfo(payload: any) {
    this._verifyPayload(payload);
    this._changePayload(payload);
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

  private _changePayload(payload: any) {
    const {
      name,
      address,
      city,
      province,
      postalCode,
      phoneNumber,
      faxNumber,
      email,
      website,
      pharmacyLicenseId,
      pharmacyLicenseValidityPeriod,
      medicalDevicesLicenseId,
      medicalDevicesLicenseValidityPeriod,
      contactPersonName,
      contactPersonPhoneNumber,
    } = payload;

    this._name = name;
    this._address = new Address({
      detail: address,
      city,
      province,
      postalCode,
    });
    this._phoneNumber = phoneNumber;
    this._faxNumber = faxNumber;
    this._email = email;
    this._website = website;
    this._licenses = new Licenses({
      pharmacy: new LicenseInformation({
        licenseId: pharmacyLicenseId,
        validityPeriod: pharmacyLicenseValidityPeriod,
      }),
      medicalDevices: new LicenseInformation({
        licenseId: medicalDevicesLicenseId,
        validityPeriod: medicalDevicesLicenseValidityPeriod,
      }),
    });
    this._contactPerson = new ContactPerson({
      name: contactPersonName,
      phoneNumber: contactPersonPhoneNumber,
    });
  }

  get name(): string {
    return this._name;
  }

  get address(): Address {
    return this._address;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  get faxNumber(): string {
    return this._faxNumber;
  }

  get email(): string {
    return this._email;
  }

  get website(): string {
    return this._website;
  }

  get licenses(): Licenses {
    return this._licenses;
  }

  get contactPerson(): ContactPerson {
    return this._contactPerson;
  }
}
