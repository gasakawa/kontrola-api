import { UserAuthDTO, UserDTO, UserUpdateDTO } from 'data/dtos';
import { IUserRepository } from 'data/protocols/db';
import { UserModel, UserSigin } from 'domain/models';

export class UserRepositoryStub implements IUserRepository {
  async activate(_userId: string): Promise<boolean> {
    return new Promise(resolve => resolve(true));
  }

  async findByEmail(_email: string): Promise<UserDTO | null> {
    const fakeUser = {
      name: 'User',
      address: 'address',
      phoneNumber: 'phone_number',
      email: 'user@email.com',
      flgActive: true,
      flgConfirmed: true,
      gender: 'M',
    };

    return new Promise(resolve => resolve(fakeUser));
  }

  async confirmUser(_email: string): Promise<boolean> {
    return new Promise(resolve => resolve(true));
  }

  async create(data: UserModel): Promise<UserAuthDTO> {
    const fakeUser = {
      email: data.email,
      sub: 'sub',
      isConfirmed: false,
    };

    return new Promise(resolve => resolve(fakeUser));
  }

  async authenticate(_username: string): Promise<UserSigin | null> {
    const signinUser = {
      email: 'user@email.com',
      id: 'id',
      name: 'User',
      sub: 'sub',
      company: 'company',
      role: 1,
      flgActive: true,
      flgConfirmed: true,
      profilePicUrl: 'profile_pic_url',
    };

    return new Promise(resolve => resolve(signinUser));
  }

  async update(_user: UserUpdateDTO): Promise<boolean> {
    return new Promise(resolve => resolve(true));
  }

  async findById(_userId: string): Promise<UserDTO | null> {
    const fakeUser = {
      name: 'User',
      address: 'address',
      phoneNumber: 'phone_number',
      email: 'user@email.com',
      flgActive: true,
      flgConfirmed: true,
      gender: 'M',
    };

    return new Promise(resolve => resolve(fakeUser));
  }
}
