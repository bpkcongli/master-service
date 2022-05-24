import SupplierUseCase from '../SupplierUseCase';
import SupplierValidator from '../../validators/SupplierValidator';
import SupplierRepository
  from '../../../Domains/repositories/SupplierRepository';
import Supplier from '../../../Domains/entities/Supplier';

describe('SupplierUseCase', () => {
  /**
   * Test Cases:
   * - Should have method addSupplier and should orchestrating the add
   *   supplier functionality correctly
   */
  it(`Should have method addSupplier and should orchestrating the add supplier 
    functionality correctly`, () => {
    const id = '37b27a8ff501';
    const payload = {
      name: 'Anugrah Argon Medica. PT',
      address: 'Jl. Pinang-Kunciran No.31, RT.002/RW.007, Kunciran',
      city: 'Kota Tangerang',
      province: 'Banten',
      postalCode: '15144',
      phoneNumber: '021-22225555',
    };

    const supplierValidator = {
      validateAddSupplierPayload: jest.fn().mockImplementation(() => ({
        value: payload,
      })),
    };

    const supplierRepository = {
      addSupplier: jest.fn(),
    };

    const fakeIdGenerator = jest.fn().mockImplementation(() => id);

    const supplierUseCase = new SupplierUseCase(
      supplierValidator as unknown as SupplierValidator,
      supplierRepository as unknown as SupplierRepository,
      fakeIdGenerator,
    );

    expect(supplierUseCase).toHaveProperty('addSupplier');
    expect(() => supplierUseCase.addSupplier(payload)).not.toThrowError();
    expect(supplierValidator.validateAddSupplierPayload)
        .toBeCalledWith(payload);
    expect(supplierRepository.addSupplier)
        .toBeCalledWith(new Supplier({
          id: `supplier-${id}`,
          ...payload,
        }));
  });
});
