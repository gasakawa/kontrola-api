import { GetModuleService } from 'data/services/module';
import { GetModulesController } from 'presentation/controllers/module';
import { Controller } from 'presentation/protocols';
import { container } from 'tsyringe';

export const makeGetModuleController = (): Controller => {
  const getModuleService = container.resolve(GetModuleService);
  return new GetModulesController(getModuleService);
};
