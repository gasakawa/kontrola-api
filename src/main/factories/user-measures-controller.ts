import { CreateUserMeasureService } from 'data/services/user-measures';
import { CreateUserMeasureController } from 'presentation/controllers/user-measures';
import { Controller } from 'presentation/protocols';
import { container } from 'tsyringe';

export const makeUserMeasureController = (): Controller => {
  const createUserMeasureService = container.resolve(CreateUserMeasureService);
  return new CreateUserMeasureController(createUserMeasureService);
};
