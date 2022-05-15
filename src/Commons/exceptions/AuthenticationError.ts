import ClientError from '../contracts/ClientError';

export default class AuthenticationError extends Error implements ClientError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
    this.statusCode = 401;
  }
}
