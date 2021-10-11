import { NextFunction, Request, Response } from 'express';

export const corsResponseHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.set('access-control-allow-origin', '*');
  res.set('access-control-allow-headers', '*');
  res.set('access-control-allow-methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

  next();
};
