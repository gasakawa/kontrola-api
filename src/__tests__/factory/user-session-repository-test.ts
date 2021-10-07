import { ISessionRepository } from 'data/protocols/db';
import { SessionModel } from 'domain/models';

export class UserSessionRepositoryStub implements ISessionRepository {
  async create(_session: SessionModel): Promise<string> {
    return new Promise(resolve => resolve('session'));
  }

  async invalidate(_sessionId: string): Promise<boolean> {
    return new Promise(resolve => resolve(true));
  }
}
