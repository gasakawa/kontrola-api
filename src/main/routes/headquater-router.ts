import { Router } from 'express';
import { adaptRoute } from 'main/adapters/express-router';
import { makeListHeadquarterController } from 'main/factories/headquarter-controller';

import { authorize } from 'main/middlewares';

export default (router: Router): void => {
  router.get('/headquarter/:id', authorize, adaptRoute(makeListHeadquarterController()));
};
