import { AccessControlService } from 'data/services/users';
import { VerifyAccessControlController } from 'presentation/controllers/access-control';
import { Controller } from 'presentation/protocols';
import { container } from 'tsyringe';

export const makeVerifyAccessControlController = (): Controller => {
  const accessControlServices = container.resolve(AccessControlService);
  return new VerifyAccessControlController(accessControlServices);
};
