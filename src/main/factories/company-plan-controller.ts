import {
  CreateCompanyPlanPaymentControlService,
  CreateCompanyPlanService,
  HandleCompanyPlanUserService,
} from 'data/services/company-plan';
import {
  ActivateCompanyPlanUserController,
  CreateCompanyPlanControlController,
  CreateCompanyPlanController,
  CreateCompanyPlanUserController,
} from 'presentation/controllers/company-plans';
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

export const makeCompanyPlanUserController = (): Controller => {
  const handleCompanyPlanUserService = container.resolve(HandleCompanyPlanUserService);
  return new CreateCompanyPlanUserController(handleCompanyPlanUserService);
};

export const makeActivateCompanyPlanUserController = (): Controller => {
  const handleCompanyPlanUserService = container.resolve(HandleCompanyPlanUserService);
  return new ActivateCompanyPlanUserController(handleCompanyPlanUserService);
};
