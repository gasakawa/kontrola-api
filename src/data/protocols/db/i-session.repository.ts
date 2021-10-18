import { SessionLimitDTO } from 'data/dtos';
import { SessionModel } from 'domain/models/sessions';

export interface ISessionRepository {
  create: (session: SessionModel) => Promise<string>;
  invalidate: (sessionId: string) => Promise<boolean>;
  verifyLimit: (username: string) => Promise<SessionLimitDTO>;
}
