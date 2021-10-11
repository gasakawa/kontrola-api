import { Authenticator } from 'data/protocols/security';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ResendUserConfirmationCodeService {
  constructor(
    @inject('CognitoAdapter')
    private cognitoAdapter: Authenticator,
  ) {}

  public async resendCode(username: string): Promise<boolean> {
    await this.cognitoAdapter.resendConfirmationCode(username);
    return true;
  }
}
