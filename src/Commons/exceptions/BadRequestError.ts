import ClientError from '../contracts/ClientError';

export default class BadRequestError extends Error implements ClientError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = 400;
  }
}
