import { CustomError } from 'domain/errors';
import { adaptError } from 'main/adapters/error-adapter';
import { HttpResponse } from 'presentation/protocols/http';

export const badRequest = (error: CustomError): HttpResponse => ({
  statusCode: 400,
  body: adaptError(error, 400, error.name, error.internalCode),
});

export const notFound = (error: CustomError): HttpResponse => ({
  statusCode: 404,
  body: adaptError(error, 404, error.name, error.internalCode),
});

export const serverError = (error: CustomError): HttpResponse => ({
  statusCode: 500,
  body: adaptError(error, 500, error.name, error.internalCode),
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
});
