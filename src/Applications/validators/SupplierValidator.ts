interface SupplierValidator {
  validateAddSupplierPayload(payload: any): void;
  validateUpdateSupplierPayload(payload: any): void;
}

export default SupplierValidator;
