/* istanbul ignore file */
import {createContainer} from 'instances-container';
import {customAlphabet} from 'nanoid';

import SupplierRepositoryMongo from './repositories/SupplierRepositoryMongo';
import SupplierValidatorJoi from './validators/SupplierValidatorJoi';
import SupplierUseCase from '../Applications/useCases/SupplierUseCase';
import TokenVerificatorJwt from './securities/TokenVerificatorJwt';

const container = createContainer();
container.register([
  {
    key: 'SupplierRepository',
    Class: SupplierRepositoryMongo,
  },
  {
    key: 'SupplierValidator',
    Class: SupplierValidatorJoi,
  },
  {
    key: 'TokenVerificator',
    Class: TokenVerificatorJwt,
  },
]);

container.register([
  {
    key: SupplierUseCase.name,
    Class: SupplierUseCase,
    parameter: {
      dependencies: [
        {
          internal: 'SupplierValidator',
        },
        {
          internal: 'SupplierRepository',
        },
        {
          concrete: customAlphabet('0123456789abcdef', 12),
        },
      ],
    },
  },
]);

export default container;
