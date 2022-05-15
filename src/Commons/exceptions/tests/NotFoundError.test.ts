import NotFoundError from '../NotFoundError';

describe('NotFoundError class', () => {
  /**
   * Test Cases:
   * - Should have proper name, status code, and message
   */
  it('Should have proper name, status code, and message', () => {
    const message = 'an error occured';
    const notFoundError = new NotFoundError(message);

    expect(notFoundError.name).toEqual('NotFoundError');
    expect(notFoundError.statusCode).toEqual(404);
    expect(notFoundError.message).toEqual(message);
  });
});
