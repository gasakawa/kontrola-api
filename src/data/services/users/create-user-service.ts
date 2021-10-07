import { UserAuthDTO } from 'data/dtos';
import { Authenticator } from 'data/protocols/security';
import { IUserRepository } from 'data/protocols/db';
import { CustomError } from 'domain/errors';
import { UserModel } from 'domain/models';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('CognitoAdapter')
    private cognitoAdapter: Authenticator,
  ) {}

  public async create(user: UserModel): Promise<UserAuthDTO> {
    const { userSub } = await this.cognitoAdapter.signup(user);

    if (userSub) {
      Object.assign(user, { sub: userSub });
      return this.userRepository.create(user);
    }
    throw new CustomError('Error while signup user', 500, 'SingupUserInternalError', 'SingupUserInternalError');
  }
}
