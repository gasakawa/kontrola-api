import { ICompanyPlanPaymentControlRepository } from 'data/protocols/db';
import { CompanyPlanPaymentControl } from 'domain/models';

export class CompanyPlanPaymentControlRepositoryStub implements ICompanyPlanPaymentControlRepository {
  async create(_companyPlanPaymentControl: CompanyPlanPaymentControl): Promise<boolean> {
    return new Promise(resolve => resolve(true));
  }
}
