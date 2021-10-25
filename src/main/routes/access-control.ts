import { Router } from 'express';
import { adaptRoute } from 'main/adapters/express-router';
import { makeVerifyAccessControlController } from 'main/factories/access-control-controller';
import { authorize } from 'main/middlewares';

export default (router: Router): void => {
  router.post('/access-control/verify', authorize, adaptRoute(makeVerifyAccessControlController()));
};
