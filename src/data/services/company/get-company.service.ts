import { inject, injectable } from 'tsyringe';
import { ICompanyRepository } from 'data/protocols/db/i-company.repository';
import { Company } from 'domain/models';

@injectable()
export class GetCompanyService {
  constructor(
    @inject('CompanyRepository')
    private readonly companyRepository: ICompanyRepository,
  ) {}

  public async get(companyId: string): Promise<Company | null> {
    const company = await this.companyRepository.get(companyId);
    return company;
  }
}
