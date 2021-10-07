import { UserAuthDTO, UserDTO } from 'data/dtos';
import { UserModel, UserSigin } from 'domain/models';

export interface IUserRepository {
  findByEmail: (email: string) => Promise<UserDTO | null>;
  create: (data: UserModel) => Promise<UserAuthDTO>;
  confirmUser: (email: string) => Promise<boolean>;
  authenticate: (username: string) => Promise<UserSigin | null>;
  activate: (userId: string) => Promise<boolean>;
}
