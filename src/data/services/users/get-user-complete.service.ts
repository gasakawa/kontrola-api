import { UserCompleteDTO } from 'data/dtos';
import { IUserRepository } from 'data/protocols/db';
import { CustomError } from 'domain/errors';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetUserCompleteService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async get(id: string): Promise<UserCompleteDTO> {
    const user = await this.userRepository.get(id);

    if (!user) {
      throw new CustomError('User not found', 404, 'UserNotFound', 'UserNotFound');
    }

    return user;
  }
}
