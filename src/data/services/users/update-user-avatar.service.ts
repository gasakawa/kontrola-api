import { IUserRepository } from 'data/protocols/db';
import IStorageProvider from 'data/protocols/providers/i-storage-provider';
import { CustomError } from 'domain/errors';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('S3StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async updateAvatar(userId: string, fileName: string, sub: string): Promise<string> {
    const user = await this.userRepository.find(userId);

    if (!user) {
      throw new CustomError('User not found', 404, 'UserNotFound', 'UserNotFound');
    }

    if (user.sub) {
      if (user.sub !== sub) {
        throw new CustomError('Action forbidden', 403, 'ActionForbidden', 'ActionForbidden');
      }
    }

    const file = await this.storageProvider.saveFile(fileName, 'user-pics');

    await this.userRepository.updateProfilePic(userId, fileName);

    return `https://kontrola-system.s3.amazonaws.com/user-pics/${file}`;
  }
}
