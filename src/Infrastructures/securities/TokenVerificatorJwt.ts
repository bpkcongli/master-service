import jwt from 'jsonwebtoken';
import {ACCESS_TOKEN_KEY} from '../../Commons/config';
import TokenVerificator from '../../Applications/securities/TokenVerificator';

export default class TokenVerificatorJwt implements TokenVerificator {
  verify(token: string) {
    return jwt.verify(token, String(ACCESS_TOKEN_KEY));
  }
}
