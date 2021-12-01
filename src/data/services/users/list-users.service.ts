import { UserListDTO } from 'data/dtos';
import { IUserRepository } from 'data/protocols/db';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListUsersService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async list(companyId: string, roleId: number, page: number, records: number): Promise<UserListDTO | null> {
    const users = await this.userRepository.list(companyId, roleId, page, records);

    return users;
  }
}
