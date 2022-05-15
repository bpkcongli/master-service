import ForbiddenError from '../ForbiddenError';

describe('ForbiddenError class', () => {
  /**
   * Test Cases:
   * - Should have proper name, status code, and message
   */
  it('Should have proper name, status code, and message', () => {
    const message = 'an error occured';
    const forbiddenError = new ForbiddenError(message);

    expect(forbiddenError.name).toEqual('ForbiddenError');
    expect(forbiddenError.statusCode).toEqual(403);
    expect(forbiddenError.message).toEqual(message);
  });
});
