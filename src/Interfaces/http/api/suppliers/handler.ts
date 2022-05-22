import {Request, Response} from 'express';
import {Container} from 'instances-container';
import SupplierUseCase from '../../../../Applications/useCases/SupplierUseCase';

class SupplierHandler {
  private _container: Container;

  constructor(container: Container) {
    this._container = container;
    this.postSupplierHandler = this.postSupplierHandler.bind(this);
  }

  async postSupplierHandler(req: Request, res: Response) {
    const useCase = this._container.getInstance(SupplierUseCase.name);
    console.log('handler before use case');
    await useCase.addSupplier(req.body);
    console.log('handler after use case');

    return res.status(201).json({
      status: 'success',
      message: 'Supplier baru berhasil ditambahkan.',
    });
  }
}

export default SupplierHandler;
