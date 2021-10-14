import { SigninResponseDTO, SignupResponseDTO } from 'data/dtos/auth-dto';
import { UserModel } from 'domain/models';

export interface Authenticator {
  signup: (data: UserModel) => Promise<SignupResponseDTO>;
  confirmSignup: (username: string, code: string) => Promise<void>;
  signin: (username: string, password: string) => Promise<SigninResponseDTO>;
  forgotPassword: (username: string) => Promise<void>;
  resetPassword: (username: string, password: string, code: string) => Promise<void>;
  changePassword: (token: string, oldPassword: string, newPassword: string) => Promise<void>;
  resendConfirmationCode: (username: string) => Promise<void>;
  changeInitialPassword: (username: string, password: string) => Promise<void>;
}
