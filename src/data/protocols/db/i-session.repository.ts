import { SessionModel } from 'domain/models/sessions';

export interface ISessionRepository {
  create: (session: SessionModel) => Promise<string>;
  invalidate: (sessionId: string) => Promise<boolean>;
}
