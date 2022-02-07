import { ListHeadquarterService } from 'data/services/headquarter';
import { ListHeadquarterController } from 'presentation/controllers/headquarter';
import { Controller } from 'presentation/protocols';
import { container } from 'tsyringe';

export const makeListHeadquarterController = (): Controller => {
  const listHeadquarterService = container.resolve(ListHeadquarterService);
  return new ListHeadquarterController(listHeadquarterService);
};
