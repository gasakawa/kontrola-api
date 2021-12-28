import aws, { S3 } from 'aws-sdk';
import path from 'path';
import { readFile, unlink } from 'fs/promises';
import uploadConfig from 'main/config/upload';

import IStorageProvider from 'data/protocols/providers/i-storage-provider';

export default class S3StorageProvider implements IStorageProvider {
  private readonly client: S3;

  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_S3_REGION || 'us-east-1',
      secretAccessKey: process.env.AWS_S3_ACCESS_SECRET || 'NOT_DEFINED',
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID || 'NOT_DEFINED',
    });
  }

  async saveFile(file: string, folder: string): Promise<string> {
    try {
      const originalFilePath = path.resolve(uploadConfig.uploadsFolder, file);

      const fileContent = await readFile(originalFilePath);

      await this.client
        .putObject({
          Bucket: uploadConfig.config.aws.bucket,
          Key: `${folder}/${file}`,
          ACL: 'public-read',
          Body: fileContent,
        })
        .promise();

      await unlink(originalFilePath);

      return file;
    } catch (err) {
      console.error(err);
    }
    return '';
  }
}
