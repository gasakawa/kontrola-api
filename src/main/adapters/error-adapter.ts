import { CustomError } from 'domain/errors';

export const adaptError = (error: Error, statusCode = 400, name: string, internalCode: string) => {
  const customError = new CustomError(error.message, statusCode, internalCode);
  customError.name = name;

  return customError;
};
