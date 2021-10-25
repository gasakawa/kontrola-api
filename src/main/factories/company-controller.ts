import { GetCompanyService } from 'data/services/company';
import { GetCompanyController } from 'presentation/controllers/company';
import { Controller } from 'presentation/protocols';
import { container } from 'tsyringe';

export const makeGetCompanyController = (): Controller => {
  const getCompanyService = container.resolve(GetCompanyService);
  return new GetCompanyController(getCompanyService);
};
