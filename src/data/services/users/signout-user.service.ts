import { ISessionRepository } from 'data/protocols/db';
import { injectable, inject } from 'tsyringe';

@injectable()
export class SignoutUserService {
  constructor(
    @inject('UserSessionRepository')
    private userSessionRepository: ISessionRepository,
  ) {}

  public async signout(sessionId: string): Promise<boolean> {
    console.log('🚀 ~ file: signout-user.service.ts ~ line 12 ~ SignoutUserService ~ signout ~ sessionId', sessionId);

    await this.userSessionRepository.invalidate(sessionId);
    return true;
  }
}
