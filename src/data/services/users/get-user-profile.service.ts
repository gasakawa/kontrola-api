import { UserProfileDTO } from 'data/dtos';
import { IUserRepository } from 'data/protocols/db';
import { CustomError } from 'domain/errors';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetUserProfileService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async get(id: string): Promise<UserProfileDTO> {
    const findUser = await this.userRepository.getProfile(id);

    if (!findUser) {
      throw new CustomError('User not found', 404, 'UserNotFound', 'UserNotFound');
    }

    return findUser;
  }
}
