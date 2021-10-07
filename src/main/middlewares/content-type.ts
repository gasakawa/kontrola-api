import { Response, Request, NextFunction } from 'express';

export const contentType = (req: Request, res: Response, next: NextFunction) => {
  res.type('application/json');

  next();
};
