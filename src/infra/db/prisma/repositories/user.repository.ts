import validator from 'validator';
import { UserAuthDTO, UserDTO, UserListDTO, UserListRequestDto, UserProfileDTO, UserUpdateDTO } from 'data/dtos';
import { IUserRepository } from 'data/protocols/db';
import { CustomError } from 'domain/errors';
import { UserModel, UserSigin } from 'domain/models';

import prisma from 'infra/db/prisma/client/prisma-client';

export class UserRepository implements IUserRepository {
  async create(userData: UserModel): Promise<UserAuthDTO> {
    const {
      phoneNumber,
      birthdate,
      gender,
      address,
      familyName,
      email,
      givenName,
      documentId,
      roleId,
      companyId,
      documentType,
      sub,
      headquarterId,
    } = userData;
    let user = await prisma.users.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (user) {
      throw new CustomError('Email already used', 400, 'EmailAlreadyTaken', 'EmailAlreadyTaken');
    }

    user = await prisma.users.create({
      data: {
        phone_number: phoneNumber,
        birthdate: new Date(birthdate),
        gender,
        address,
        family_name: familyName,
        email,
        given_name: givenName,
        document_id: documentId,
        role_id: roleId,
        company_id: companyId,
        document_type: documentType,
        sub,
        heaquarter_id: headquarterId,
      },
    });

    return {
      isConfirmed: false,
      email: user.email,
    } as UserAuthDTO;
  }

  async confirmUser(username: string): Promise<boolean> {
    const { flg_confirmed: confirmed } = await prisma.users.update({
      data: {
        flg_confirmed: true,
      },
      where: {
        email: username,
      },
      select: {
        flg_confirmed: true,
      },
    });
    return confirmed;
  }

  async authenticate(username: string): Promise<UserSigin | null> {
    const user = await prisma.users.findUnique({
      where: {
        email: username,
      },
      select: {
        email: true,
        id: true,
        given_name: true,
        family_name: true,
        sub: true,
        company_id: true,
        role_id: true,
        flg_active: true,
        flg_confirmed: true,
        profile_pic_url: true,
      },
    });

    if (user) {
      return {
        email: user.email,
        id: user.id,
        name: `${user.given_name} ${user.family_name}`,
        sub: user.sub || '',
        company: user.company_id || '',
        role: user.role_id || 0,
        flgActive: user.flg_active,
        flgConfirmed: user.flg_confirmed,
        profilePicUrl: user.profile_pic_url || '',
      };
    }

    return null;
  }

  async activate(userId: string): Promise<boolean> {
    const { flg_active: active } = await prisma.users.update({
      data: {
        flg_active: true,
      },
      where: {
        id: userId,
      },
      select: {
        flg_active: true,
      },
    });

    return active;
  }

  async update(user: UserUpdateDTO): Promise<boolean> {
    const { address, phoneNumber, familyName, givenName } = user;
    await prisma.users.update({
      data: {
        phone_number: phoneNumber,
        address,
        family_name: familyName,
        given_name: givenName,
      },
      where: {
        id: user.id,
      },
    });
    return true;
  }

  async getProfile(userId: string): Promise<UserProfileDTO | null> {
    try {
      const result = (await prisma.$queryRaw`select * from get_user_profile(${userId})`) as any;

      const [{ get_user_profile }] = result;
      return get_user_profile as UserProfileDTO;
    } catch (err) {
      console.error(err);
    }
    return null;
  }

  async find(key: string): Promise<UserDTO | null> {
    let condition;
    if (validator.isEmail(key)) {
      condition = {
        email: key,
      };
    } else {
      condition = {
        id: key,
      };
    }
    const user = await prisma.users.findUnique({
      where: condition,
      select: {
        given_name: true,
        family_name: true,
        address: true,
        phone_number: true,
        email: true,
        flg_active: true,
        flg_confirmed: true,
        gender: true,
        sub: true,
      },
    });

    if (user) {
      return {
        email: user.email,
        name: `${user.given_name} ${user.family_name}`,
        address: user.address,
        phoneNumber: user.phone_number,
        flgActive: user.flg_active,
        flgConfirmed: user.flg_confirmed,
        gender: user.gender,
        sub: user.sub || '',
      };
    }

    return null;
  }

  async list(userListRequestDto: UserListRequestDto): Promise<UserListDTO | null> {
    const { companyId, records, page, orderDirection, orderField, queryField, roleId } = userListRequestDto;
    const realPage = (page - 1) * records;
    try {
      const result =
        (await prisma.$queryRaw`select * from list_users(${companyId}, ${roleId}, ${realPage}, ${records}, ${orderField}, ${orderDirection}, ${queryField})`) as any;

      const [{ list_users }] = result;
      return list_users as UserListDTO;
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  async updateProfilePic(userId: string, picUrl: string): Promise<boolean> {
    await prisma.users.update({
      data: {
        profile_pic_url: picUrl,
      },
      where: {
        id: userId,
      },
    });
    return true;
  }
}
