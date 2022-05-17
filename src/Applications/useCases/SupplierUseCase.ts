import SupplierValidator from '../validators/SupplierValidator';
import SupplierRepository
  from '../../Domains/suppliers/repositories/SupplierRepository';
import Supplier from '../../Domains/suppliers/entities/Supplier';

export default class SupplierUseCase {
  private _validator: SupplierValidator;
  private _repository: SupplierRepository;
  private _idGenerator: () => string;

  constructor(
      validator: SupplierValidator,
      repository: SupplierRepository,
      idGenerator: () => string,
  ) {
    this._validator = validator;
    this._repository = repository;
    this._idGenerator = idGenerator;
  }

  addSupplier(payload: any) {
    this._validator.validateAddSupplierPayload(payload);
    const supplier = new Supplier({
      id: `supplier-${this._idGenerator()}`,
      ...payload,
    });
    this._repository.addSupplier(supplier);
  }
}
