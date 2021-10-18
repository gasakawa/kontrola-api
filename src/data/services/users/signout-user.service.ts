import { ISessionRepository } from 'data/protocols/db';
import { injectable, inject } from 'tsyringe';

@injectable()
export class SignoutUserService {
  constructor(
    @inject('UserSessionRepository')
    private userSessionRepository: ISessionRepository,
  ) {}

  public async signout(sessionId: string): Promise<boolean> {
    await this.userSessionRepository.invalidate(sessionId);
    return true;
  }
}
