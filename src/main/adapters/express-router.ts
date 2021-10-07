import { Request, Response } from 'express';
import { Controller } from 'presentation/protocols';

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const { statusCode, body } = await controller.handle(req);
    res.status(statusCode).json(body);
  };
};
