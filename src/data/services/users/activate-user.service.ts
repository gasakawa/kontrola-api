import { IUserRepository } from 'data/protocols/db';
import { CustomError } from 'domain/errors';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ActivateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async activate(userId: string): Promise<boolean> {
    const user = await this.userRepository.find(userId);

    if (!user) {
      throw new CustomError('User not found', 404, 'UserNotFound', 'UserNotFound');
    }

    const active = await this.userRepository.activate(userId);
    return active;
  }
}
