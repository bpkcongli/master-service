import Supplier from '../entities/Supplier';
import SupplierFilterProps
  from '../../../Commons/contracts/SupplierFilterProps';

interface SupplierRepository {
  addSupplier(supplier: Supplier): Promise<void>;
  getAllSuppliers(props: SupplierFilterProps): Promise<any[]>;
  getSpecificSupplier(id: string): Promise<any>;
  updateSpecificSupplier(id: string, payload: any): Promise<void>;
  deleteSpecificSupplier(id: string): Promise<void>;
}

export default SupplierRepository;
