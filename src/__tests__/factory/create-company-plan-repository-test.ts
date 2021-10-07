import { ICompanyPlanRepository } from 'data/protocols/db/i-company-plan';
import { CompanyPlan } from 'domain/models';

export class CompanyPlanRepositoryStub implements ICompanyPlanRepository {
  async create(_companyPlan: CompanyPlan): Promise<boolean> {
    return new Promise(resolve => resolve(true));
  }
}
