import { Router } from 'express';
import { adaptRoute } from 'main/adapters/express-router';
import {
  makeActivateUserController,
  makeChangeInitialPasswordController,
  makeChangePasswordController,
  makeConfirmSignupController,
  makeForgotPasswordController,
  makeGetUserController,
  makeListUsersController,
  makeResendUserConfirmationCodeController,
  makeResetPasswordController,
  makeSinginController,
  makeUpdateUserController,
  makeUserAuthController,
} from 'main/factories/user-controller';
import { authorize } from 'main/middlewares';

export default (router: Router): void => {
  router.post('/user/signup', adaptRoute(makeUserAuthController()));
  router.post('/user/confirm', adaptRoute(makeConfirmSignupController()));
  router.post('/user/activate', adaptRoute(makeActivateUserController()));
  router.post('/user/signin', adaptRoute(makeSinginController()));
  router.post('/user/forgot_password', adaptRoute(makeForgotPasswordController()));
  router.post('/user/reset_password', adaptRoute(makeResetPasswordController()));
  router.post('/user/change_password', authorize, adaptRoute(makeChangePasswordController()));
  router.patch('/user/update/:id', authorize, adaptRoute(makeUpdateUserController()));
  router.post('/user/resend_code', adaptRoute(makeResendUserConfirmationCodeController()));
  router.post('/user/change_initial_password', adaptRoute(makeChangeInitialPasswordController()));
  router.get('/user/profile/:id', authorize, adaptRoute(makeGetUserController()));
  router.get('/user/list/:companyId', authorize, adaptRoute(makeListUsersController()));
};
