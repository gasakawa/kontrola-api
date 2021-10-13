import { CustomError } from 'domain/errors';

export const adaptError = (error: Error, statusCode = 400, name: string, code: string) => {
  const customError = new CustomError(error.message, statusCode, code);
  customError.name = name;

  return customError;
};
