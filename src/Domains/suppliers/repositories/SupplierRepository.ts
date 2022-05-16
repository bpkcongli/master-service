import Supplier from '../entities/Supplier';
import SupplierFilterProps
  from '../../../Commons/contracts/SupplierFilterProps';

interface SupplierRepository {
  addSupplier(supplier: Supplier): void;
  getAllSuppliers(props: SupplierFilterProps): any[];
  getSpecificSupplier(id: string): any;
  updateSpecificSupplier(id: string, payload: any): void;
  deleteSpecificSupplier(id: string): void;
}

export default SupplierRepository;
