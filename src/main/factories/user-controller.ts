import {
  ActivateUserService,
  AuthenticateUserService,
  ChangeInitialPasswordService,
  ConfirmUserService,
  CreateUserService,
  GetUserService,
  HandleUserPasswordService,
  ListUsersService,
  ResendUserConfirmationCodeService,
} from 'data/services/users';
import { Controller } from 'presentation/protocols';
import {
  ChangeInitialPasswordController,
  ChangePasswordController,
  ConfirmSignupController,
  ForgotPasswordController,
  GetUserController,
  ListUsersController,
  ResetPasswordController,
  SigninController,
  SignupController,
  UpdateUserController,
} from 'presentation/controllers/users';

import { container } from 'tsyringe';
import { ActivateUserController } from 'presentation/controllers/users/activate-user.controller';
import { ResendUserConfirmationCodeController } from 'presentation/controllers/users/resend-user-confirmation-code.controller';
import { UpdateUserService } from 'data/services/users/update-user.service';

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

export const makeResendUserConfirmationCodeController = (): Controller => {
  const resendUserConfirmationCodeService = container.resolve(ResendUserConfirmationCodeService);
  return new ResendUserConfirmationCodeController(resendUserConfirmationCodeService);
};

export const makeChangeInitialPasswordController = (): Controller => {
  const changeInitialPasswordService = container.resolve(ChangeInitialPasswordService);
  return new ChangeInitialPasswordController(changeInitialPasswordService);
};

export const makeUpdateUserController = (): Controller => {
  const updateUserService = container.resolve(UpdateUserService);
  return new UpdateUserController(updateUserService);
};

export const makeGetUserController = (): Controller => {
  const getUserService = container.resolve(GetUserService);
  return new GetUserController(getUserService);
};

export const makeListUsersController = (): Controller => {
  const listUsersService = container.resolve(ListUsersService);
  return new ListUsersController(listUsersService);
};
