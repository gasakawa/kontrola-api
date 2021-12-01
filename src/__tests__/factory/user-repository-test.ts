import { UserAuthDTO, UserDTO, UserListDTO, UserProfileDTO, UserUpdateDTO } from 'data/dtos';
import { IUserRepository } from 'data/protocols/db';
import { UserModel, UserSigin } from 'domain/models';

export class UserRepositoryStub implements IUserRepository {
  async list(_companyId: string, _roleId: number, _page: number, _records: number): Promise<UserListDTO | null> {
    return new Promise(resolve =>
      resolve({
        allowAddNewUser: true,
        pages: 1,
        totalAdmins: 2,
        totalUsers: 50,
        users: [
          {
            id: 'user_id',
            plan: 'Plan',
            email: 'user@email.com',
            status: 'status',
            fullName: 'Full Name',
          },
        ],
      }),
    );
  }

  async activate(_userId: string): Promise<boolean> {
    return new Promise(resolve => resolve(true));
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

  async getProfile(_id: string): Promise<UserProfileDTO> {
    return new Promise(resolve =>
      resolve({
        email: 'user@email.com',
        name: 'John Doe',
        address: 'address',
        phoneNumber: 'phone_number',
        flgActive: true,
        flgConfirmed: true,
        gender: 'M',
        headquarter: 'headquarter',
        profilePic: 'profile_url',
        plan: {
          name: 'Plan',
          lastPaymentDate: '27/10/2021',
          nextPaymentDate: '26/11/2021',
          value: 100,
        },
        givenName: 'John',
        familyName: 'Doe',
        id: 'user_id',
      }),
    );
  }

  async find(_key: string): Promise<UserDTO | null> {
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
