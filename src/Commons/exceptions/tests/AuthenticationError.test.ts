import AuthenticationError from '../AuthenticationError';

describe('AuthenticationError class', () => {
  /**
   * Test Cases:
   * - Should have proper name, status code, and message
   */
  it('Should have proper name, status code, and message', () => {
    const message = 'an error occured';
    const authenticationError = new AuthenticationError(message);

    expect(authenticationError.name).toEqual('AuthenticationError');
    expect(authenticationError.statusCode).toEqual(401);
    expect(authenticationError.message).toEqual(message);
  });
});
