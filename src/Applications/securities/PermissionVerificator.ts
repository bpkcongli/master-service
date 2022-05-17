import {PermissionVerificatorProps, PermissionACL}
  from '../../Commons/contracts/PermissionVerificatorProps';

class PermissionVerificator {
  private _permissionACL: PermissionACL[];
  private _baseUrl: string;

  constructor(permissionACL: PermissionACL[], baseUrl: string) {
    this._permissionACL = permissionACL;
    this._baseUrl = baseUrl;
  }

  verify(props: PermissionVerificatorProps) {
    const {permissions, relativeUrl, method, params} = props;
    const endpoint = this._endpointBuilder(relativeUrl, method, params);
    const target = this._permissionACL.find((permission) => {
      return permission.endpoint === endpoint;
    });

    if (!target || !permissions.includes(target.permission)) {
      throw new Error('PERMISSION_VALIDATOR.NO_PERMITTED');
    }
  }

  private _removeQuery(path: string) {
    return path.slice(0, path.indexOf('?'));
  }

  private _endpointBuilder(
      relativeUrl: string,
      method: string,
      params: Record<string, string>,
  ) {
    const paramKeys = Object.keys(params);
    const paramValues = Object.values(params);
    let endpoint = `${method} ${this._baseUrl}`;

    const relativeUrlSplitted = relativeUrl.split('/').slice(1);
    let totalPiece = 0;
    relativeUrlSplitted.forEach((piece, i) => {
      if (piece === paramValues[i-totalPiece]) {
        endpoint += `/:${paramKeys[i-totalPiece]}`;
      } else {
        if (piece.includes('?')) {
          const afterRemoveQuery = this._removeQuery(piece);
          endpoint += afterRemoveQuery ? `/${afterRemoveQuery}` : '';
        } else {
          endpoint += piece ? `/${piece}` : '';
          totalPiece += 1;
        }
      }
    });

    return endpoint;
  }
}

export default PermissionVerificator;
