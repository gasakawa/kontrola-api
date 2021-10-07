import { ICompanyPlanRepository } from 'data/protocols/db/i-company-plan';
import { CompanyPlan } from 'domain/models';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateCompanyPlanService {
  constructor(
    @inject('CompanyPlanRepository')
    private readonly companyPlanRepository: ICompanyPlanRepository,
  ) {}

  public async create(companyPlan: CompanyPlan): Promise<boolean> {
    const created = await this.companyPlanRepository.create(companyPlan);
    return created;
  }
}
