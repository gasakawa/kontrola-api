import { IUserRepository } from 'data/protocols/db';
import { Authenticator } from 'data/protocols/security';
import { CustomError } from 'domain/errors';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ChangeInitialPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('CognitoAdapter')
    private cognitoAdapter: Authenticator,
  ) {}

  public async change(username: string, password: string, oldPassword: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(username);
    if (user?.flgConfirmed) {
      throw new CustomError('User already confirmed', 400, 'UserAlreadyConfirmed', 'UserAlreadyConfirmed');
    }

    try {
      const { accessToken } = await this.cognitoAdapter.signin(username, oldPassword);

      if (accessToken !== 'NO_RESULT') {
        throw new CustomError('Temporary password incorrect', 400, 'WrongTemporayPassword', 'WrongTemporayPassword');
      }
    } catch (e: any) {
      if (e.code === 'NotAuthorizedException') {
        throw new CustomError(e.message, e.statusCode, e.code, e.name);
      }
    }

    await this.cognitoAdapter.changeInitialPassword(username, password);
    const confirmed = await this.userRepository.confirmUser(username);

    return confirmed;
  }
}
