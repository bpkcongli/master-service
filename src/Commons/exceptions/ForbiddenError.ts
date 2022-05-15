import ClientError from '../contracts/ClientError';

export default class ForbiddenError extends Error implements ClientError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = 403;
  }
}
