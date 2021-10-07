import { Authenticator } from 'data/protocols/security';
import { inject, injectable } from 'tsyringe';

@injectable()
export class HandleUserPasswordService {
  constructor(
    @inject('CognitoAdapter')
    private cognitoAdapter: Authenticator,
  ) {}

  public async forgotPassword(username: string): Promise<boolean> {
    await this.cognitoAdapter.forgotPassword(username);
    return true;
  }

  public async resetPassword(username: string, password: string, code: string): Promise<boolean> {
    await this.cognitoAdapter.resetPassword(username, password, code);
    return true;
  }

  public async changePassword(token: string, oldPassword: string, newPassword: string): Promise<boolean> {
    await this.cognitoAdapter.changePassword(token, oldPassword, newPassword);
    return true;
  }
}
