import SupplierValidator from '../validators/SupplierValidator';
import ValidatorResult from '../../Commons/contracts/ValidatorResult';
import BadRequestError from '../../Commons/exceptions/BadRequestError';
import SupplierRepository
  from '../../Domains/repositories/SupplierRepository';
import Supplier from '../../Domains/entities/Supplier';

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

  async addSupplier(payload: any) {
    const validationResult: ValidatorResult = this._validator
        .validateAddSupplierPayload(payload);

    if (validationResult.error) {
      throw new BadRequestError(`ValidationError: ${validationResult.error}`);
    }

    const supplier = new Supplier({
      id: `supplier-${this._idGenerator()}`,
      ...payload,
    });
    await this._repository.addSupplier(supplier);
  }
}
