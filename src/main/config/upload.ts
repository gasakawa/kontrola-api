import path from 'path';
import multer, { StorageEngine } from 'multer';
import { uuid } from 'uuidv4';

const tempFolder = path.resolve(__dirname, '..', '..', '..', 'temp');
const regx = /(?:\.([^.]+))?$/;

interface IUploadConfig {
  config: {
    aws: {
      bucket: string;
    };
  };
  multer: {
    storage: StorageEngine;
  };
  tempFolder: string;
  uploadsFolder: string;
}

export default {
  tempFolder,
  uploadsFolder: path.resolve(tempFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: path.resolve(tempFolder, 'uploads'),
      filename(request, file, callback) {
        const fileHash = uuid();
        const extensions = regx.exec(file.originalname);

        const extension = extensions ? extensions[0] : '.png';
        const filename = `${fileHash}${extension}`;

        return callback(null, filename);
      },
    }),
  },
  config: {
    aws: {
      bucket: 'kontrola-system',
    },
  },
} as IUploadConfig;
