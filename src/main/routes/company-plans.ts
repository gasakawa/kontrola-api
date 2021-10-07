import { Router } from 'express';
import { adaptRoute } from 'main/adapters/express-router';
import {
  makeActivateCompanyPlanUserController,
  makeCompanyPlanController,
  makeCompanyPlanPaymentControlController,
  makeCompanyPlanUserController,
} from 'main/factories/company-plan-controller';
import { authorize } from 'main/middlewares';

export default (router: Router): void => {
  router.post('/company_plan/create', authorize, adaptRoute(makeCompanyPlanController()));
  router.post('/company_plan/payment_control/create', authorize, adaptRoute(makeCompanyPlanPaymentControlController()));
  router.post('/company_plan/user/create', authorize, adaptRoute(makeCompanyPlanUserController()));
  router.post('/company_plan/user/activate/:id', authorize, adaptRoute(makeActivateCompanyPlanUserController()));
};
