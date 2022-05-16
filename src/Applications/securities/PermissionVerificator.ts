import PermissionVerificatorProps
  from '../../Commons/contracts/PermissionVerificatorProps';

interface PermissionVerificator {
  verify(props: PermissionVerificatorProps): void;
}

export default PermissionVerificator;
