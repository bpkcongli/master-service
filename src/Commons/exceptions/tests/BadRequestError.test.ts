import BadRequestError from '../BadRequestError';

describe('BadRequestError class', () => {
  /**
   * Test Cases:
   * - Should have proper name, status code, and message
   */
  it('Should have proper name, status code, and message', () => {
    const message = 'an error occured';
    const badRequestError = new BadRequestError(message);

    expect(badRequestError.name).toEqual('BadRequestError');
    expect(badRequestError.statusCode).toEqual(400);
    expect(badRequestError.message).toEqual(message);
  });
});
