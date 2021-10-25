import { Router } from 'express';
import { adaptRoute } from 'main/adapters/express-router';
import { makeGetCompanyController } from 'main/factories/company-controller';

import { authorize } from 'main/middlewares';

export default (router: Router): void => {
  router.get('/companies/:id', authorize, adaptRoute(makeGetCompanyController()));
};
