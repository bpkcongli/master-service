import Joi from 'joi';
import ValidatorResult from '../../Commons/contracts/ValidatorResult';
import SupplierValidator
  from '../../Applications/validators/SupplierValidator';

export default class SupplierValidatorJoi implements SupplierValidator {
  private _postalCodePattern = /^[0-9+]{5}$/;
  private _phoneNumberPattern = /^([0-9+]{10,13}|[0-9+]{3,4}-[0-9+]{6,9})$/;
  private _websiteUrlPattern = /^https?:\/\//;
  private _addSupplierPayloadSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    province: Joi.string().required(),
    postalCode: Joi.string().strict().pattern(this._postalCodePattern)
        .required(),
    phoneNumber: Joi.string().pattern(this._phoneNumberPattern).required(),
    faxNumber: Joi.string().pattern(this._phoneNumberPattern),
    email: Joi.string().email(),
    website: Joi.string().pattern(this._websiteUrlPattern),
    pharmacyLicenseId: Joi.string(),
    pharmacyLicenseValidityPeriod: Joi.string().isoDate(),
    medicalDevicesLicenseId: Joi.string(),
    medicalDevicesLicenseValidityPeriod: Joi.string().isoDate(),
    contactPersonName: Joi.string(),
    contactPersonPhoneNumber: Joi.string().pattern(this._phoneNumberPattern),
  });

  validateAddSupplierPayload(payload: any): ValidatorResult {
    const validationResult = this._addSupplierPayloadSchema.validate(payload);
    return {
      value: validationResult.value,
      error: validationResult.error ?
        validationResult.error.message : undefined,
    };
  }

  validateUpdateSupplierPayload() {}
}
