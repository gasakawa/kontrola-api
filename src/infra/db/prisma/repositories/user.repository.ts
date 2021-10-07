import { UserAuthDTO, UserDTO } from 'data/dtos';
import { IUserRepository } from 'data/protocols/db';
import { CustomError } from 'domain/errors';
import { UserModel, UserSigin } from 'domain/models';

import prisma from 'infra/db/prisma/client/prisma-client';

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<UserDTO | null> {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
      select: {
        given_name: true,
        family_name: true,
        address: true,
        phone_number: true,
        email: true,
        flg_active: true,
        flg_confirmed: true,
        gender: true,
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
      };
    }

    return null;
  }

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
    const { flg_confirmed: active } = await prisma.users.update({
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
    return active;
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
      };
    }

    return null;
  }

  async activate(userId: string): Promise<boolean> {
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new CustomError('User not found', 404, 'UserNotFound', 'UserNotFound');
    }
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
}
