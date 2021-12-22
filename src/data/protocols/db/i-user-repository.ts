import { UserAuthDTO, UserDTO, UserListDTO, UserListRequestDto, UserProfileDTO, UserUpdateDTO } from 'data/dtos';
import { UserModel, UserSigin } from 'domain/models';

export interface IUserRepository {
  create: (data: UserModel) => Promise<UserAuthDTO>;
  confirmUser: (email: string) => Promise<boolean>;
  authenticate: (username: string) => Promise<UserSigin | null>;
  activate: (userId: string) => Promise<boolean>;
  update: (user: UserUpdateDTO) => Promise<boolean>;
  getProfile: (userId: string) => Promise<UserProfileDTO | null>;
  find: (key: string) => Promise<UserDTO | null>;
  list: (userListRequestDto: UserListRequestDto) => Promise<UserListDTO | null>;
  updateProfilePic: (userId: string, picUrl: string) => Promise<boolean>;
}
