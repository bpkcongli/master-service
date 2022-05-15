import Supplier from '../entities/Supplier';
import ListSupplierDTO from '../dto/ListSupplierDTO';

const Mapper = {
  toListSupplierDTO: (supplier: Supplier): ListSupplierDTO => {
    const {id, name, address, phoneNumber, contactPerson} = supplier;

    return new ListSupplierDTO({
      id,
      name,
      address: address.detail,
      city: address.city,
      province: address.province,
      phoneNumber: phoneNumber,
      contactPersonName: contactPerson.name,
      contactPersonPhoneNumber: contactPerson.phoneNumber,
    });
  },
};

export default Mapper;
