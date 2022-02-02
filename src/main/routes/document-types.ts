import { Router } from 'express';
import { adaptRoute } from 'main/adapters/express-router';
import { makeGetDocumentTypeController } from 'main/factories/document-type-controller';

import { authorize } from 'main/middlewares';

export default (router: Router): void => {
  router.get('/document-types', authorize, adaptRoute(makeGetDocumentTypeController()));
};
