import { CustomError } from 'domain/errors';
import { NextFunction, Request, Response } from 'express';
import { UserSessionRepository } from 'infra/db/prisma/repositories/user-session.repository';
import { JWTHandler } from 'main/handler/jwt/jwt-handler';

const invalidateSession = async (sessionId: string): Promise<void> => {
  const userSessionRepository = new UserSessionRepository();
  await userSessionRepository.invalidate(sessionId);
};

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'] as string;
  const sessionId = req.headers['x-session-id'] as string;

  if (!token) {
    throw new CustomError('Credentials missing', 401, 'TokenMissing', 'TokenError');
  }
  if (!sessionId) {
    throw new CustomError('Session id invalid', 401, 'SessionIdInvalid', 'SessionError');
  }
  try {
    JWTHandler.verifyAccessToken(token);
  } catch (e) {
    if (e instanceof CustomError) {
      invalidateSession(sessionId);
      throw e;
    }
  }

  next();
};
