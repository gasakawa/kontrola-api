import { Authenticator } from 'data/protocols/security';
import { IUserRepository } from 'data/protocols/db';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ConfirmUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('CognitoAdapter')
    private cognitoAdapter: Authenticator,
  ) {}

  public async confirm(username: string, code: string): Promise<boolean> {
    await this.cognitoAdapter.confirmSignup(username, code);
    const confirmed = this.userRepository.confirmUser(username);
    return confirmed;
  }
}
