import { HeadquarterDTO } from 'data/dtos/headquarter-dto';
import { IHeadquarterRepository } from 'data/protocols/db/i-headquarter.repository';
import prisma from '../client/prisma-client';

export class HeadquarterRepository implements IHeadquarterRepository {
  async list(companyId: string): Promise<HeadquarterDTO[] | null> {
    const headquarters = await prisma.headquarters.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        company_id: companyId,
      },
    });
    return headquarters;
  }
}
