import { SigninResponseDTO, SignupResponseDTO } from 'data/dtos/auth-dto';
import { Authenticator } from 'data/protocols/security';
import { UserModel } from 'domain/models/users';

export class CognitoAdapterStub implements Authenticator {
  async resendConfirmationCode(_username: string): Promise<void> {}

  async confirmSignup(_usenaname: string, _code: string): Promise<void> {}

  async signup(_data: UserModel): Promise<SignupResponseDTO> {
    const singupResponse = {
      email: 'user@email.com',
      userSub: 'sub',
      isConfirmed: false,
    };

    return new Promise(resolve => resolve(singupResponse));
  }

  hashSecret(_username: string): string {
    return 'hash';
  }

  async signin(_username: string, _password: string): Promise<SigninResponseDTO> {
    const signinResponse = {
      accessToken: 'access_token',
      expiresIn: 0,
      refreshToken: 'refresh_token',
      tokenType: 'token_type',
      tokenData: {
        name: 'User',
        sub: 'sub',
        company: 'company',
        profile: 1,
        sessionId: 'session',
        active: true,
        confirmed: true,
      },
    };

    return new Promise(resolve => resolve(signinResponse));
  }

  async forgotPassword(_username: string): Promise<void> {}

  async resetPassword(_username: string, _password: string, _code: string): Promise<void> {}

  async changePassword(_token: string, _oldPassword: string, _newPassword: string): Promise<void> {}
}
