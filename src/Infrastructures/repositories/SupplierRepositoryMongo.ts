import SupplierRepository
  from '../../Domains/repositories/SupplierRepository';
import SupplierFilterProps from '../../Commons/contracts/SupplierFilterProps';
import Supplier from '../../Domains/entities/Supplier';
import SupplierDO from '../databases/mongodb/models/SupplierDO';

export default class SupplierRepositoryMongo implements SupplierRepository {
  async addSupplier(supplier: Supplier) {
    const {
      id,
      name,
      address,
      phoneNumber,
      faxNumber,
      email,
      website,
      licenses,
      contactPerson,
    } = supplier;
    const supplierDO = new SupplierDO({
      id,
      name,
      address: {
        detail: address.detail,
        city: address.city,
        province: address.province,
        postalCode: address.postalCode,
      },
      phoneNumber,
      faxNumber,
      email,
      website,
      licenses: {
        pharmacy: {
          licenseId: licenses.pharmacy.licenseId,
          validityPeriod: licenses.pharmacy.validityPeriod,
        },
        medicalDevices: {
          licenseId: licenses.medicalDevices.licenseId,
          validityPeriod: licenses.medicalDevices.validityPeriod,
        },
      },
      contactPerson: {
        name: contactPerson.name,
        phoneNumber: contactPerson.phoneNumber,
      },
    });
    await supplierDO.save();
  }

  async getAllSuppliers(props: SupplierFilterProps) {
    console.log(props);
    return [];
  }

  async getSpecificSupplier() {}

  async updateSpecificSupplier() {}

  async deleteSpecificSupplier() {}
}
