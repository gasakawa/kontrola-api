import { NextFunction, Request, Response } from 'express';
import global from 'main/config/global';

export const getLanguage = (req: Request, res: Response, next: NextFunction) => {
  const lang = req.headers['x-lang'] as string;

  global.lang = lang === undefined ? 'en' : lang;

  next();
};
