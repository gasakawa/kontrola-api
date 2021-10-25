import { ICompanyRepository } from 'data/protocols/db/i-company.repository';
import { Company } from 'domain/models';
import prisma from '../client/prisma-client';

export class CompanyRepository implements ICompanyRepository {
  async get(companyId: string): Promise<Company | null> {
    const company = await prisma.companies.findUnique({
      where: {
        id: companyId,
      },
    });

    if (company) {
      return {
        name: company.name,
        address: company.address,
        id: company.id,
        phoneNumber: company.phone_number,
        companyPicUrl: company.company_pic_url || '',
      };
    }

    return null;
  }
}
