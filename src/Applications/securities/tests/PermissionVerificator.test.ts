import PermissionVerificator from '../PermissionVerificator';
import {PermissionACL, PermissionVerificatorProps}
  from '../../../Commons/contracts/PermissionVerificatorProps';

describe('PermissionVerificator', () => {
  /**
   * Test Cases:
   * - Should throw an error if request url doesn't exist on permissionACL
   * - Should throw an error if request doesn't have an appropriate
   *   permission
   * - Should successfully validate access to specific endpoint if request have
   *   an appropriate permission
   */
  const permissionACL: PermissionACL[] = [
    {
      endpoint: 'POST /api/v1/masters/suppliers',
      permission: 'master.suppliers.add',
    },
    {
      endpoint: 'GET /api/v1/masters/suppliers',
      permission: 'master.suppliers.list',
    },
    {
      endpoint: 'GET /api/v1/masters/suppliers/:supplierId',
      permission: 'master.suppliers.get',
    },
    {
      endpoint: 'PUT /api/v1/masters/suppliers/:supplierId',
      permission: 'master.suppliers.update',
    },
    {
      endpoint: 'DELETE /api/v1/masters/suppliers/:supplierId',
      permission: 'master.suppliers.delete',
    },
    {
      endpoint: 'GET /api/v1/masters/suppliers/:supplierId/orders',
      permission: 'master.suppliers.showOrder',
    },
    {
      endpoint: 'GET /api/v1/masters/suppliers/:supplierId/orders/:orderId',
      permission: 'master.suppliers.showSpecificOrder',
    },
  ];
  const baseUrlShort = '/api/v1/masters';
  const baseUrlLong = '/api/v1/masters/suppliers';
  const shortExamples: PermissionVerificatorProps[] = [
    {
      permissions: ['master.suppliers.add'],
      relativeUrl: '/suppliers',
      method: 'POST',
      params: {},
    },
    {
      permissions: ['master.suppliers.list'],
      relativeUrl: '/suppliers?offset=0&limit=20',
      method: 'GET',
      params: {},
    },
    {
      permissions: ['master.suppliers.get'],
      relativeUrl: '/suppliers/supplier-37b27a8ff502',
      method: 'GET',
      params: {supplierId: 'supplier-37b27a8ff502'},
    },
    {
      permissions: ['master.suppliers.update'],
      relativeUrl: '/suppliers/supplier-37b27a8ff502',
      method: 'PUT',
      params: {supplierId: 'supplier-37b27a8ff502'},
    },
    {
      permissions: ['master.suppliers.delete'],
      relativeUrl: '/suppliers/supplier-37b27a8ff502',
      method: 'DELETE',
      params: {supplierId: 'supplier-37b27a8ff502'},
    },
    {
      permissions: ['master.suppliers.showOrder'],
      relativeUrl: '/suppliers/supplier-37b27a8ff502/orders',
      method: 'GET',
      params: {supplierId: 'supplier-37b27a8ff502'},
    },
    {
      permissions: ['master.suppliers.showSpecificOrder'],
      relativeUrl: '/suppliers/supplier-37b27a8ff502/orders/order-37b27a8ff502',
      method: 'GET',
      params: {
        supplierId: 'supplier-37b27a8ff502',
        orderId: 'order-37b27a8ff502',
      },
    },
  ];
  const longExamples: PermissionVerificatorProps[] = [
    {
      permissions: ['master.suppliers.add'],
      relativeUrl: '/',
      method: 'POST',
      params: {},
    },
    {
      permissions: ['master.suppliers.list'],
      relativeUrl: '/?offset=0&limit=20',
      method: 'GET',
      params: {},
    },
    {
      permissions: ['master.suppliers.get'],
      relativeUrl: '/supplier-37b27a8ff502',
      method: 'GET',
      params: {supplierId: 'supplier-37b27a8ff502'},
    },
    {
      permissions: ['master.suppliers.update'],
      relativeUrl: '/supplier-37b27a8ff502',
      method: 'PUT',
      params: {supplierId: 'supplier-37b27a8ff502'},
    },
    {
      permissions: ['master.suppliers.delete'],
      relativeUrl: '/supplier-37b27a8ff502',
      method: 'DELETE',
      params: {supplierId: 'supplier-37b27a8ff502'},
    },
    {
      permissions: ['master.suppliers.showOrder'],
      relativeUrl: '/supplier-37b27a8ff502/orders',
      method: 'GET',
      params: {supplierId: 'supplier-37b27a8ff502'},
    },
    {
      permissions: ['master.suppliers.showSpecificOrder'],
      relativeUrl: '/supplier-37b27a8ff502/orders/order-37b27a8ff502',
      method: 'GET',
      params: {
        supplierId: 'supplier-37b27a8ff502',
        orderId: 'order-37b27a8ff502',
      },
    },
  ];

  it(`Should throw an error if request url doesn't exist on
    permissionACL`, () => {
    const permissionVerificator = new PermissionVerificator(
        permissionACL,
        baseUrlShort,
    );
    expect(() => permissionVerificator.verify({
      permissions: ['master.suppliers.list'],
      relativeUrl: '/orders',
      method: 'POST',
      params: {},
    })).toThrowError('Maaf, endpoint tidak ditemukan.');
  });

  it(`Should throw an error if request doesn't have an appropriate
    permission`, () => {
    const permissionVerificator = new PermissionVerificator(
        permissionACL,
        baseUrlLong,
    );
    expect(() => permissionVerificator.verify({
      permissions: ['master.suppliers.list'],
      relativeUrl: '/',
      method: 'POST',
      params: {},
    })).toThrowError();
  });

  it(`Should successfully validate access to specific endpoint if request hav
    an appropriate permission`, () => {
    const permissionVerificatorShort = new PermissionVerificator(
        permissionACL,
        baseUrlShort,
    );

    shortExamples.forEach((example) => {
      expect(() => permissionVerificatorShort.verify(example))
          .not.toThrowError();
    });

    const permissionVerificatorLong = new PermissionVerificator(
        permissionACL,
        baseUrlLong,
    );

    longExamples.forEach((example) => {
      expect(() => permissionVerificatorLong.verify(example))
          .not.toThrowError();
    });
  });
});
