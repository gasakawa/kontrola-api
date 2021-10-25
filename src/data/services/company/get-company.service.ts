import { inject, injectable } from 'tsyringe';
import { ICompanyRepository } from 'data/protocols/db/i-company.repository';
import { Company } from 'domain/models';
import { CustomError } from 'domain/errors';

@injectable()
export class GetCompanyService {
  constructor(
    @inject('CompanyRepository')
    private readonly companyRepository: ICompanyRepository,
  ) {}

  public async get(companyId: string): Promise<Company> {
    const company = await this.companyRepository.get(companyId);

    if (company) {
      return company;
    }

    throw new CustomError('Company not found', 404, 'CompanyNotFound', 'CompanyNotFound');
  }
}
