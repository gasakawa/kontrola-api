import { BusinessPlanSettings } from 'domain/models';

export interface IBusinessPlanSettingsRepository {
  list: (bpType: number) => Promise<BusinessPlanSettings | null>;
  getLimits: (companyId: string) => Promise<BusinessPlanSettings>;
}
