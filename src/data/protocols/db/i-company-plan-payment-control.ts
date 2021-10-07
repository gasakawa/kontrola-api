import { CompanyPlanPaymentControl } from 'domain/models';

export interface ICompanyPlanPaymentControlRepository {
  create: (companyPlanPaymentControl: CompanyPlanPaymentControl) => Promise<boolean>;
}
