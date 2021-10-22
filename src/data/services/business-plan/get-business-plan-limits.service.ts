import { IBusinessPlanSettingsRepository } from 'data/protocols/db';
import { BusinessPlanSettings } from 'domain/models';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetBusinessPlanLimitsService {
  constructor(
    @inject('BusinessPlanSettingsRepository')
    private readonly businessPlanSettingsRepository: IBusinessPlanSettingsRepository,
  ) {}

  public async getLimits(companyId: string): Promise<BusinessPlanSettings> {
    const limits = await this.businessPlanSettingsRepository.getLimits(companyId);

    return limits;
  }
}
