import {Router} from 'express';
import {Container} from 'instances-container';
import SupplierHandler from './handler';

const SupplierAPI = (container: Container) => {
  const supplierHandler = new SupplierHandler(container);
  const router = Router();

  router.post('/', supplierHandler.postSupplierHandler);
  return router;
};

export default SupplierAPI;

