import { SessionLimitDTO } from 'data/dtos';
import { ISessionRepository } from 'data/protocols/db';
import { SessionModel } from 'domain/models';
import prisma from 'infra/db/prisma/client/prisma-client';

export class UserSessionRepository implements ISessionRepository {
  async verifyLimit(username: string): Promise<SessionLimitDTO> {
    const result = (await prisma.$queryRaw`select * from verify_user_session_limit(${username})`) as any;
    const [{ verify_user_session_limit }] = result;
    return verify_user_session_limit as SessionLimitDTO;
  }

  async create(session: SessionModel): Promise<string> {
    const { ip, country, city, longitude, latitude, hostname } = session.sessionInfo;

    const { id } = await prisma.sessions.create({
      data: {
        user_id: session.userId,
        token: session.token,
        company_id: session.company_id,
        session_info: {
          ip,
          country,
          city,
          longitude,
          latitude,
          hostname,
        },
      },
      select: {
        id: true,
      },
    });

    return id;
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
