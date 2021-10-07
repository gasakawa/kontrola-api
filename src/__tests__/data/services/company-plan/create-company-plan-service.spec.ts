import { CreateCompanyPlanService } from 'data/services/company-plan';
import { CompanyPlan } from 'domain/models';
import { CompanyPlanRepositoryStub } from '__tests__/factory/create-company-plan-repository-test';
import { buildFakeCompanyPlan } from '__tests__/factory/mocks/company-plans';

type SutTypes = {
  sut: CreateCompanyPlanService;
  companyPlanRepositoryStub: CompanyPlanRepositoryStub;
  fakeCompanyPlan: CompanyPlan;
};

const makeSut = (): SutTypes => {
  const companyPlanRepositoryStub = new CompanyPlanRepositoryStub();
  const fakeCompanyPlan = buildFakeCompanyPlan();
  const sut = new CreateCompanyPlanService(companyPlanRepositoryStub);
  return {
    sut,
    companyPlanRepositoryStub,
    fakeCompanyPlan,
  };
};

describe('Create Company Plan Service', () => {
  it('should be able to create a new company plan service', async () => {
    const { sut, fakeCompanyPlan } = makeSut();
    const created = await sut.create(fakeCompanyPlan);
    expect(created).toBe(true);
  });
});
