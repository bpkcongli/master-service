import Mapper from '../Mapper';
import Supplier from '../../entities/Supplier';
import ListSupplierDTO from '../../dto/ListSupplierDTO';

describe('Mapper', () => {
  /**
   * Test Cases:
   * - Should have method toListSupplierDTO()
   * - Method toListSupplierDTO() should successfully mapping a Supplier object
   *   into ListSupplierDTO object
   */
  it('Should have method toListSupplierDTO()', () => {
    expect(Mapper).toHaveProperty('toListSupplierDTO');
  });

  it(`Method toListSupplierDTO() should successfully mapping a Supplier object
    into ListSupplierDTO object`, () => {
    const supplier = new Supplier({
      id: 'supplier-37b27a8ff502',
      name: 'PT. Anugerah Pharmindo Lestari',
      address: 'Tower 10th Floor Cowell Tower, Jl. Senen Raya No.135, RW.2',
      city: 'Kota Jakarta Pusat',
      province: 'DKI Jakarta',
      postalCode: '10410',
      phoneNumber: '021-5636588',
      faxNumber: '021-5636588',
      email: 'info@apl.com',
      website: 'https://www.anugerah-pharmindo.com',
      pharmacyLicenseId: 'PBF-001-0003',
      pharmacyLicenseValidityPeriod: '02-01-2023',
      medicalDevicesLicenseId: 'PBAK-001-0003',
      medicalDevicesLicenseValidityPeriod: '02-01-2023',
    });

    const expectedListSupplierDTO = new ListSupplierDTO({
      id: 'supplier-37b27a8ff502',
      name: 'PT. Anugerah Pharmindo Lestari',
      address: 'Tower 10th Floor Cowell Tower, Jl. Senen Raya No.135, RW.2',
      city: 'Kota Jakarta Pusat',
      province: 'DKI Jakarta',
      phoneNumber: '021-5636588',
      contactPersonName: '',
      contactPersonPhoneNumber: '',
    });

    const listSupplierDTO = Mapper.toListSupplierDTO(supplier);
    expect(listSupplierDTO).toStrictEqual(expectedListSupplierDTO);
  });
});
