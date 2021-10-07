import { CompanyPlanUser } from 'domain/models';

export interface ICompanyPlanUsersRepository {
  create: (companyPlanUser: CompanyPlanUser) => Promise<boolean>;
  activate: (id: number) => Promise<boolean>;
  inactivate: (id: number) => Promise<boolean>;
}
