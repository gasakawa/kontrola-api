import { IUserRepository } from 'data/protocols/db';
import { Authenticator } from 'data/protocols/security';
import { CustomError } from 'domain/errors';
import { inject, injectable } from 'tsyringe';

@injectable()
export class HandleUserPasswordService {
  constructor(
    @inject('CognitoAdapter')
    private cognitoAdapter: Authenticator,
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async forgotPassword(username: string): Promise<boolean> {
    const user = await this.userRepository.find(username);
    if (user === null) {
      throw new CustomError('E-mail not found', 404, 'EmailNotFound', 'EmailNotFound');
    }
    await this.cognitoAdapter.forgotPassword(username);
    return true;
  }

  public async resetPassword(username: string, password: string, code: string): Promise<boolean> {
    const user = await this.userRepository.find(username);
    if (user === null) {
      throw new CustomError('E-mail not found', 404, 'EmailNotFound', 'EmailNotFound');
    }
    await this.cognitoAdapter.resetPassword(username, password, code);
    return true;
  }

  public async changePassword(token: string, oldPassword: string, newPassword: string): Promise<boolean> {
    await this.cognitoAdapter.changePassword(token, oldPassword, newPassword);
    return true;
  }
}
