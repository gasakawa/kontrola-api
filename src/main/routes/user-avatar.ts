import { Router } from 'express';
import multer from 'multer';
import { adaptRoute } from 'main/adapters/express-router';
import { makeUpdateUserAvatarController } from 'main/factories/user-controller';
import uploadConfig from 'main/config/upload';
import { authorize } from 'main/middlewares';

const upload = multer(uploadConfig.multer);

export default (router: Router): void => {
  router.patch('/user/avatar/:id', authorize, upload.single('avatar'), adaptRoute(makeUpdateUserAvatarController()));
};
