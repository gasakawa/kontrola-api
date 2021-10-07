import { ICompanyPlanUsersRepository } from 'data/protocols/db';
import { CompanyPlanUser } from 'domain/models';
import prisma from '../client/prisma-client';

export class CompanyPlanUserRepository implements ICompanyPlanUsersRepository {
  async create(companyPlanUser: CompanyPlanUser): Promise<boolean> {
    const { companyPlanId, userId } = companyPlanUser;
    const { id } = await prisma.company_plan_users.create({
      data: {
        company_plan_id: companyPlanId,
        user_id: userId,
        flg_active: false,
      },
      select: {
        id: true,
      },
    });
    return id !== undefined;
  }

  async activate(id: number): Promise<boolean> {
    const { flg_active: activate } = await prisma.company_plan_users.update({
      where: {
        id,
      },
      data: {
        flg_active: true,
      },
      select: {
        flg_active: true,
      },
    });
    return activate;
  }

  async inactivate(id: number): Promise<boolean> {
    const { flg_active: activate } = await prisma.company_plan_users.update({
      where: {
        id,
      },
      data: {
        flg_active: false,
      },
      select: {
        flg_active: true,
      },
    });
    return activate;
  }
}
