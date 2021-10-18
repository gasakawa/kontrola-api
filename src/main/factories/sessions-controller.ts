import { container } from 'tsyringe';
import { SignoutUserService } from 'data/services/users/signout-user.service';
import { Controller } from 'presentation/protocols';
import { SignoutController } from 'presentation/controllers/sessions/signout.controller';

export const makeSignoutController = (): Controller => {
  const signoutUserService = container.resolve(SignoutUserService);
  return new SignoutController(signoutUserService);
};
