import { ICompanyRepository } from 'data/protocols/db/i-company.repository';
import { Company } from 'domain/models';

export class CompanyRepositoryStub implements ICompanyRepository {
  async get(_companyId: string): Promise<Company | null> {
    return new Promise(resolve =>
      resolve({
        name: 'Company',
        address: 'address',
        companyPicUrl: 'url',
        id: 'id',
        phoneNumber: 'phone_number',
      }),
    );
  }
}
