export class CustomError extends Error {
  message: string;

  statusCode: number;

  internalCode: string;

  constructor(message: string, statusCode = 400, internalCode: string, name = 'Custom Error') {
    super();
    this.name = name;
    this.message = message;
    this.statusCode = statusCode;
    this.internalCode = internalCode;
  }
}
