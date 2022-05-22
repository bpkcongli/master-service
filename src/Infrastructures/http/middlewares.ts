import {Request, Response, NextFunction} from 'express';
import {COOKIE_NAME} from '../../Commons/config';
import BadRequestError from '../../Commons/exceptions/BadRequestError';
import ForbiddenError from '../../Commons/exceptions/ForbiddenError';
import TokenVerificator from '../../Applications/securities/TokenVerificator';
import PermissionVerificator
  from '../../Applications/securities/PermissionVerificator';

class Middleware {
  private _tokenVerificator: TokenVerificator;
  private _permissionVerificator: PermissionVerificator;

  constructor(
      tokenVerificator: TokenVerificator,
      permissionVerificator: PermissionVerificator,
  ) {
    this._tokenVerificator = tokenVerificator;
    this._permissionVerificator = permissionVerificator;
    this.permissionExtractor = this.permissionExtractor.bind(this);
  }

  cookieExtractor(req: Request, res: Response, next: NextFunction) {
    if (!Object.keys(req.cookies).includes(String(COOKIE_NAME))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Maaf, Anda membutuhkan kredensial untuk melakukan ' +
          'operasi ini.',
      });
    }

    return next();
  }

  async permissionExtractor(req: Request, _: Response, next: NextFunction) {
    const {method, params, url: relativeUrl} = req;
    const token = req.cookies._bmp_sid;
    const {id} = this._tokenVerificator.verify(token);
    const permissions = id === 'user-3f8d3db53231' ?
      ['administration.users.add'] : ['master.suppliers.add'];

    this._permissionVerificator.verify({
      permissions,
      method,
      params,
      relativeUrl,
    });

    next();
  }

  errorHandler(err: Error, _: Request, res: Response, __: NextFunction) {
    let response;

    if (err.name === ForbiddenError.name) {
      response = res.status(403).json({
        status: 'fail',
        message: 'Maaf, Anda tidak memiliki otorisasi untuk melakukan ' +
          'operasi ini.',
        details: {
          message: err.message,
        },
      });
    } else if (err.name === BadRequestError.name) {
      response = res.status(400).json({
        status: 'fail',
        message: 'Maaf, server tidak dapat memproses permintaan Anda.',
        details: {
          message: err.message,
        },
      });
    }

    return response;
  }
}

export default Middleware;
