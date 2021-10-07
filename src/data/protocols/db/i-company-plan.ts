import { CompanyPlan } from 'domain/models';

export interface ICompanyPlanRepository {
  create: (companyPlan: CompanyPlan) => Promise<boolean>;
}
