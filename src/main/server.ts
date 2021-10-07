import 'reflect-metadata';
import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { CustomError } from 'domain/errors';
import app from './config/app';
import 'main/container';

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof CustomError) {
    return response.status(err.statusCode).json(err);
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
