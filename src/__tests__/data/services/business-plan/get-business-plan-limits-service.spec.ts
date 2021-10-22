import { GetBusinessPlanLimitsService } from 'data/services/business-plan';
import { BusinesPlanSettingRepositoryStub } from '__tests__/factory';
import { throwError } from '__tests__/factory/error-test';

const makeSut = () => {
  const businessPlanSettingsRepository = new BusinesPlanSettingRepositoryStub();
  const sut = new GetBusinessPlanLimitsService(businessPlanSettingsRepository);

  return {
    sut,
    businessPlanSettingsRepository,
  };
};

describe('Get Business Plan Limits Service', () => {
  it('should return a company business plan limit', async () => {
    const { sut } = makeSut();

    const limits = await sut.getLimits('company_id');

    expect(limits).toBeTruthy();
    expect(limits.adminLimit).toBe(2);
  });

  it('should throws if business plan settings repository throws', async () => {
    const { sut, businessPlanSettingsRepository } = makeSut();

    jest.spyOn(businessPlanSettingsRepository, 'getLimits').mockRejectedValue(throwError);

    const promise = sut.getLimits('company_id');

    await expect(promise).rejects.toThrowError();
  });
});
