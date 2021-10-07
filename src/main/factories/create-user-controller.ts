import {
  ActivateUserService,
  AuthenticateUserService,
  ConfirmUserService,
  CreateUserService,
  HandleUserPasswordService,
} from 'data/services/users';
import { Controller } from 'presentation/protocols';
import {
  ChangePasswordController,
  ConfirmSignupController,
  ForgotPasswordController,
  ResetPasswordController,
  SigninController,
  SignupController,
} from 'presentation/controllers/users';

import { container } from 'tsyringe';
import { ActivateUserController } from 'presentation/controllers/users/activate-user.controller';

const handleUserPasswordService = container.resolve(HandleUserPasswordService);

export const makeUserAuthController = (): Controller => {
  const createUserService = container.resolve(CreateUserService);
  return new SignupController(createUserService);
};

export const makeConfirmSignupController = (): Controller => {
  const confirmUserService = container.resolve(ConfirmUserService);
  return new ConfirmSignupController(confirmUserService);
};

export const makeSinginController = (): Controller => {
  const authenticateService = container.resolve(AuthenticateUserService);
  return new SigninController(authenticateService);
};

export const makeForgotPasswordController = (): Controller => {
  return new ForgotPasswordController(handleUserPasswordService);
};

export const makeResetPasswordController = (): Controller => {
  return new ResetPasswordController(handleUserPasswordService);
};

export const makeChangePasswordController = (): Controller => {
  return new ChangePasswordController(handleUserPasswordService);
};

export const makeActivateUserController = (): Controller => {
  const activateUserService = container.resolve(ActivateUserService);
  return new ActivateUserController(activateUserService);
};
