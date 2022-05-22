import {PermissionACL}
  from '../../../Commons/contracts/PermissionVerificatorProps';

const SupplierPermissionACL: PermissionACL[] = [
  {
    endpoint: 'POST /api/v1/masters/suppliers',
    permission: 'master.suppliers.add',
  },
];

export default SupplierPermissionACL;
