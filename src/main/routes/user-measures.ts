import { Router } from 'express';
import { adaptRoute } from 'main/adapters/express-router';
import { makeUserMeasureController } from 'main/factories/user-measures-controller';
import { authorize } from 'main/middlewares';

export default (router: Router): void => {
  router.post('/user_measure/create', authorize, adaptRoute(makeUserMeasureController()));
};
