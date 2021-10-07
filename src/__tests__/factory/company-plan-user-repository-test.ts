import { ICompanyPlanUsersRepository } from 'data/protocols/db';
import { CompanyPlanUser } from 'domain/models';

export class CompanyPlanUserRepositoryStub implements ICompanyPlanUsersRepository {
  async create(_companyPlanUser: CompanyPlanUser): Promise<boolean> {
    return new Promise(resolve => resolve(true));
  }

  async activate(_id: number): Promise<boolean> {
    return new Promise(resolve => resolve(true));
  }

  async inactivate(_id: number): Promise<boolean> {
    return new Promise(resolve => resolve(false));
  }
}
