import { HandleCompanyPlanUserService } from 'data/services/company-plan';
import { CompanyPlanUserRepositoryStub, UserRepositoryStub } from '__tests__/factory';
import { buildFakeCompanyPlanUser } from '__tests__/factory/mocks/company-plans';

const makeSut = () => {
  const companyPlanUserStub = new CompanyPlanUserRepositoryStub();
  const userRepositoryStub = new UserRepositoryStub();
  const sut = new HandleCompanyPlanUserService(companyPlanUserStub, userRepositoryStub);

  const fakeCompanyPlanUser = buildFakeCompanyPlanUser();

  return {
    sut,
    companyPlanUserStub,
    userRepositoryStub,
    fakeCompanyPlanUser,
  };
};

describe('Handle Company Plan User Service', () => {
  it('should be able to create a company plan user', async () => {
    const { sut, fakeCompanyPlanUser } = makeSut();
    const created = await sut.create(fakeCompanyPlanUser);
    expect(created).toBe(true);
  });

  it('should be able to activate a company user plan', async () => {
    const { sut } = makeSut();
    const active = await sut.activate(1);
    expect(active).toBe(true);
  });

  it('should be able to deactivate a company user plan', async () => {
    const { sut } = makeSut();
    const inactive = await sut.inactivate(1);
    expect(inactive).toBe(false);
  });

  it('should call company plan user repository with correct data when inactivate', async () => {
    const { sut, companyPlanUserStub } = makeSut();
    const spy = jest.spyOn(companyPlanUserStub, 'inactivate');
    await sut.inactivate(1);
    expect(spy).toHaveBeenCalledWith(1);
  });
});
