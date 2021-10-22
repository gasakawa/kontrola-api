import { Router } from 'express';
import { adaptRoute } from 'main/adapters/express-router';
import { makeGetBusinessPlanLimitsController } from 'main/factories/business-plan-settings-controller';
import { authorize } from 'main/middlewares';

export default (router: Router): void => {
  router.get('/business/limits/:id', authorize, adaptRoute(makeGetBusinessPlanLimitsController()));
};
