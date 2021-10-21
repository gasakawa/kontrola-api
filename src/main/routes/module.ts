import { Router } from 'express';
import { adaptRoute } from 'main/adapters/express-router';
import { makeGetModuleController } from 'main/factories/module-controller';
import { authorize } from 'main/middlewares';

export default (router: Router): void => {
  router.get('/modules/:id', authorize, adaptRoute(makeGetModuleController()));
};
