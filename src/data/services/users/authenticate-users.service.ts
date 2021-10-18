import { SigninResponseDTO } from 'data/dtos/auth-dto';
import { Authenticator } from 'data/protocols/security';
import { ISessionRepository, IUserRepository } from 'data/protocols/db';
import { CustomError } from 'domain/errors';
import { injectable, inject } from 'tsyringe';
import { SessionInfo } from 'domain/models';

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('CognitoAdapter')
    private cognitoAdapter: Authenticator,
    @inject('UserSessionRepository')
    private userSessionRepository: ISessionRepository,
  ) {}

  public async authenticate(username: string, password: string, sessionData: SessionInfo): Promise<SigninResponseDTO> {
    const user = await this.userRepository.authenticate(username);
    if (user === null) {
      throw new CustomError('User not found', 404, 'UserNotFound', 'UserError');
    }
    if (!user.flgConfirmed) {
      throw new CustomError('User not confirmed', 400, 'UserNotConfirmed', 'UserError');
    }
    if (!user.flgActive) {
      throw new CustomError('User inactive', 400, 'UserInactive', 'UserError');
    }

    const session = await this.userSessionRepository.verifyLimit(username);

    if (!session.allowLogin) {
      return {
        accessToken: 'NOT_CONFIGURED',
        refreshToken: 'NOT_CONFIGURED',
        expiresIn: 0,
        tokenType: 'NOT_CONFIGURED',
        sessionLimits: session,
      };
    }

    const { accessToken, refreshToken, tokenType, expiresIn } = await this.cognitoAdapter.signin(username, password);

    const { ip, country, city, longitude, latitude, hostname } = sessionData;

    const sessionId = await this.userSessionRepository.create({
      userId: user.id,
      token: accessToken,
      company_id: user.company,
      sessionInfo: { ip, country, city, longitude, latitude, hostname },
    });

    return {
      accessToken,
      refreshToken,
      tokenType,
      expiresIn,
      tokenData: {
        name: user.name,
        sub: user.sub,
        company: user.company,
        profile: user.role,
        sessionId,
        active: user.flgActive,
        confirmed: user.flgConfirmed,
      },
    };
  }
}
