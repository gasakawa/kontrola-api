import { Router } from 'express';
import { adaptRoute } from 'main/adapters/express-router';
import { makeSignoutController } from 'main/factories/sessions-controller';

export default (router: Router): void => {
  router.put('/session/signout/:id', adaptRoute(makeSignoutController()));
};
