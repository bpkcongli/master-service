import ClientError from '../contracts/ClientError';

export default class NotFoundError extends Error implements ClientError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}
