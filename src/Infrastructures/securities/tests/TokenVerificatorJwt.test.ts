import jwt from 'jsonwebtoken';
import TokenVerificatorJwt from '../TokenVerificatorJwt';
import {ACCESS_TOKEN_KEY} from '../../../Commons/config';

describe('TokenVerificatorJwt', () => {
  /**
   * Test Cases:
   * - Should verify a token correctly so other part of the system can use the
   *   information stored on the decoded payload
   */
  it(`Should verify a token correctly so other part of the system can use the
    information stored on the decoded payload`, () => {
    const payload = {id: 'user-37b27a8ff502'};
    const token = jwt.sign(payload, String(ACCESS_TOKEN_KEY));

    const tokenVerificatorJwt = new TokenVerificatorJwt();
    const decodedPayload = tokenVerificatorJwt.verify(token);
    expect((decodedPayload as any).id).toEqual(payload.id);
  });
});
