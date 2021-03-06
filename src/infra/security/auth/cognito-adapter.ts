import crypto from 'crypto';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { SigninResponseDTO, SignupResponseDTO } from 'data/dtos/auth-dto';
import { Authenticator } from 'data/protocols/security';
import { UserModel } from 'domain/models';
import { CustomError } from 'domain/errors';

const clientSecret = process.env.AWS_COGNITO_CLIENT_SECRET || 'NOT_CONFIGURED';
const clientId = process.env.AWS_COGNITO_CLIENT_ID || 'NOT_CONFIGURED';
const userPoolId = process.env.AWS_COGNITO_USER_POOL_ID || 'NOT_CONFIGURE';
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider({
  apiVersion: process.env.AWS_API_VERSION,
  region: process.env.AWS_REGION,
});
export class CognitoAdapter implements Authenticator {
  constructor() {}

  async signin(username: string, password: string): Promise<SigninResponseDTO> {
    const params = {
      ClientId: clientId,
      AuthFlow: 'USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: this.hashSecret(username),
      },
    };

    const { AuthenticationResult } = await cognitoIdentityServiceProvider.initiateAuth(params).promise();

    return {
      accessToken: AuthenticationResult?.AccessToken || 'NO_RESULT',
      expiresIn: AuthenticationResult?.ExpiresIn || 0,
      tokenType: AuthenticationResult?.TokenType || 'NO_RESULT',
      idToken: AuthenticationResult?.IdToken || 'NO_RESULT',
      refreshToken: AuthenticationResult?.RefreshToken || 'NO_RESULT',
    };
  }

  async confirmSignup(username: string, code: string): Promise<void> {
    const params = {
      ClientId: clientId,
      ConfirmationCode: code,
      Username: username,
      SecretHash: this.hashSecret(username),
    };

    await cognitoIdentityServiceProvider.confirmSignUp(params).promise();
  }

  async signup(data: UserModel): Promise<SignupResponseDTO> {
    const userAttributes = [
      {
        Name: 'email',
        Value: data.email,
      },
      {
        Name: 'profile',
        Value: `${data.roleId}`,
      },
      {
        Name: 'name',
        Value: `${data.givenName} ${data.familyName}`,
      },
      {
        Name: 'custom:company',
        Value: data.companyId,
      },
      {
        Name: 'custom:role',
        Value: `${data.roleId}`,
      },
    ];

    const params = {
      Username: data.username,
      UserPoolId: userPoolId,
      DesiredDeliveryMediums: ['EMAIL'],
      UserAttributes: userAttributes,
    };
    const { User } = await cognitoIdentityServiceProvider.adminCreateUser(params).promise();

    if (User) {
      if (User.Attributes) {
        const sub = User.Attributes.filter(attr => attr.Name === 'sub');

        return {
          userSub: sub[0].Value || '',
          isConfirmed: User.Enabled || false,
        };
      }
    }
    throw new CustomError('Error while register user in provider', 500, 'AdminCreateUserError', 'AdminCreateUserError');
  }

  async forgotPassword(username: string): Promise<void> {
    const params = {
      ClientId: clientId,
      Username: username,
      SecretHash: this.hashSecret(username),
    };

    await cognitoIdentityServiceProvider.forgotPassword(params).promise();
  }

  async resetPassword(username: string, password: string, code: string): Promise<void> {
    const params = {
      ClientId: clientId,
      ConfirmationCode: code,
      Password: password,
      Username: username,
      SecretHash: this.hashSecret(username),
    };

    await cognitoIdentityServiceProvider.confirmForgotPassword(params).promise();
  }

  async changePassword(token: string, oldPassword: string, newPassword: string): Promise<void> {
    const params = {
      AccessToken: token,
      PreviousPassword: oldPassword,
      ProposedPassword: newPassword,
    };

    await cognitoIdentityServiceProvider.changePassword(params).promise();
  }

  async resendConfirmationCode(username: string): Promise<void> {
    const params = {
      ClientId: clientId,
      Username: username,
      SecretHash: this.hashSecret(username),
    };

    await cognitoIdentityServiceProvider.resendConfirmationCode(params).promise();
  }

  async changeInitialPassword(username: string, password: string): Promise<void> {
    const params = {
      Username: username,
      Password: password,
      Permanent: true,
      UserPoolId: userPoolId,
    };

    await cognitoIdentityServiceProvider.adminSetUserPassword(params).promise();
    await cognitoIdentityServiceProvider
      .adminUpdateUserAttributes({
        UserAttributes: [{ Name: 'email_verified', Value: 'true' }],
        Username: username,
        UserPoolId: userPoolId,
      })
      .promise();
  }

  hashSecret = (username: string): string => {
    return crypto
      .createHmac('SHA256', clientSecret)
      .update(username + clientId)
      .digest('base64');
  };
}
