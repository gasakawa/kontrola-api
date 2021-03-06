import {
  UserAuthDTO,
  UserCompleteDTO,
  UserDTO,
  UserListDTO,
  UserListRequestDto,
  UserProfileDTO,
  UserUpdateDTO,
} from 'data/dtos';
import { IUserRepository } from 'data/protocols/db';
import { UserModel, UserSigin } from 'domain/models';

export class UserRepositoryStub implements IUserRepository {
  async get(_id: string): Promise<UserCompleteDTO | null> {
    return new Promise(resolve =>
      resolve({
        address: 'address',
        phoneNumber: 'phone',
        headquarterId: 1,
        givenName: 'Given Name',
        familyName: 'Family Name',
        gender: 'gender',
        email: 'user@email.com',
        documentType: 1,
        documentId: 'document_id',
        birthdate: new Date(),
        role: 1,
      }),
    );
  }

  async updateProfilePic(_userId: string, _picUrl: string): Promise<boolean> {
    return new Promise(resolve => resolve(true));
  }

  async list(_userListRequestDto: UserListRequestDto): Promise<UserListDTO | null> {
    return new Promise(resolve =>
      resolve({
        allowAddNewUser: true,
        pages: 1,
        totalAdmins: 2,
        totalUsers: 50,
        totalRecords: 10,
        users: [
          {
            id: 'user_id',
            plan: 'Plan',
            email: 'user@email.com',
            status: 'status',
            fullName: 'Full Name',
            documentId: 'document_id',
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

  async getProfile(_id: string): Promise<UserProfileDTO | null> {
    return new Promise(resolve =>
      resolve({
        user: {
          email: 'user@email.com',
          name: 'John Doe',
          address: 'address',
          phoneNumber: 'phone_number',
          flgActive: true,
          flgConfirmed: true,
          gender: 'M',
          headquarter: 'headquarter',
          profilePic: 'profile_url',
          givenName: 'John',
          familyName: 'Doe',
          id: 'user_id',
        },
        plan: {
          name: 'Plan',
          lastPaymentDate: '27/10/2021',
          nextPaymentDate: '26/11/2021',
          value: 100,
          overdue: false,
        },
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
