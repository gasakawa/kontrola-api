import { Router } from 'express';
import { adaptRoute } from 'main/adapters/express-router';
import { makeVerifyAccessControlController } from 'main/factories/access-control-controller';

export default (router: Router): void => {
  router.post('/access-control/verify', adaptRoute(makeVerifyAccessControlController()));
};
