import { UserUpdateDTO } from 'data/dtos';
import { IUserRepository } from 'data/protocols/db';
import { CustomError } from 'domain/errors';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async update(user: UserUpdateDTO): Promise<boolean> {
    const findUser = await this.userRepository.find(user.id);

    if (!findUser) {
      throw new CustomError('User not found', 404, 'UserNotFound', 'UserNotFound');
    }

    const updated = await this.userRepository.update(user);
    return updated;
  }
}
