import { CreateCompanyPlanPaymentControlService, CreateCompanyPlanService } from 'data/services/company-plan';
import { CreateCompanyPlanControlController } from 'presentation/controllers/company-plans';
import { CreateCompanyPlanController } from 'presentation/controllers/company-plans/create-company-plan.controller';
import { Controller } from 'presentation/protocols';
import { container } from 'tsyringe';

export const makeCompanyPlanController = (): Controller => {
  const createCompanyPlanService = container.resolve(CreateCompanyPlanService);
  return new CreateCompanyPlanController(createCompanyPlanService);
};

export const makeCompanyPlanPaymentControlController = (): Controller => {
  const createCompanyPlanPaymentControl = container.resolve(CreateCompanyPlanPaymentControlService);
  return new CreateCompanyPlanControlController(createCompanyPlanPaymentControl);
};
