import { ISessionRepository } from 'data/protocols/db';
import { CustomError } from 'domain/errors';
import { SessionModel } from 'domain/models';
import prisma from 'infra/db/prisma/client/prisma-client';

export class UserSessionRepository implements ISessionRepository {
  async create(session: SessionModel): Promise<string> {
    try {
      const { id } = await prisma.sessions.create({
        data: {
          user_id: session.userId,
          ip_address: session.ipAddress || '',
          token: session.token,
          company_id: session.company_id,
        },
        select: {
          id: true,
        },
      });

      return id;
    } catch (e: any) {
      if (e.code === 'P2011') {
        throw new CustomError('Sessions exceed limit', 500, 'SessionLimitExceedError', 'DatabaseError');
      }
      throw new CustomError('An error occurred while creating session', 500, 'SessionError', 'DatabaseError');
    }
  }

  async invalidate(sessionId: string): Promise<boolean> {
    const session = await prisma.sessions.findUnique({
      where: {
        id: sessionId,
      },
    });
    if (session) {
      await prisma.sessions.update({
        data: {
          flg_active: false,
          updated_at: new Date(),
        },
        where: {
          id: sessionId,
        },
      });
      return true;
    }

    return false;
  }
}
