import { UserListDTO, UserListRequestDto } from 'data/dtos';
import { IUserRepository } from 'data/protocols/db';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListUsersService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async list(userListRequestDto: UserListRequestDto): Promise<UserListDTO | null> {
    const users = await this.userRepository.list(userListRequestDto);

    return users;
  }
}
