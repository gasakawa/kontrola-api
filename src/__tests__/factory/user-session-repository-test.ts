import { SessionLimitDTO } from 'data/dtos';
import { ISessionRepository } from 'data/protocols/db';
import { SessionModel } from 'domain/models';

export class UserSessionRepositoryStub implements ISessionRepository {
  async create(_session: SessionModel): Promise<string> {
    return new Promise(resolve => resolve('session'));
  }

  async invalidate(_sessionId: string): Promise<boolean> {
    return new Promise(resolve => resolve(true));
  }

  async verifyLimit(_username: string): Promise<SessionLimitDTO> {
    return new Promise(resolve =>
      resolve({
        allowLogin: true,
        email: 'user@email.com',
        userSessionsNumber: 1,
        devicesLimit: 4,
        sessions: [
          {
            id: 'id',
            createdAt: new Date(),
            email: 'user@email.com',
          },
        ],
      }),
    );
  }
}
