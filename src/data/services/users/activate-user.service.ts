import { IUserRepository } from 'data/protocols/db';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ActivateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async activate(userId: string): Promise<boolean> {
    const active = this.userRepository.activate(userId);
    return active;
  }
}
