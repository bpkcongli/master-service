import ValidatorResult from '../../Commons/contracts/ValidatorResult';

interface SupplierValidator {
  validateAddSupplierPayload(payload: any): ValidatorResult;
  validateUpdateSupplierPayload(payload: any): void;
}

export default SupplierValidator;
