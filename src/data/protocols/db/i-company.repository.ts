import { Company } from 'domain/models';

export interface ICompanyRepository {
  get: (companyId: string) => Promise<Company | null>;
}
