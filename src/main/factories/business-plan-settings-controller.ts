import { GetBusinessPlanLimitsService } from 'data/services/business-plan';
import { GetBusinessPlanLimitsController } from 'presentation/controllers/business-plan';
import { Controller } from 'presentation/protocols';
import { container } from 'tsyringe';

export const makeGetBusinessPlanLimitsController = (): Controller => {
  const getBusinessPlanLimitsService = container.resolve(GetBusinessPlanLimitsService);
  return new GetBusinessPlanLimitsController(getBusinessPlanLimitsService);
};
