import { CompanyPlanUserRepository } from 'infra/db/prisma/repositories';
import { buildFakeCompanyPlanUser } from '__tests__/factory/mocks/company-plans';
import { prismaMock } from '__tests__/factory/singleton';

const makeSut = () => {
  const sut = new CompanyPlanUserRepository();
  const fakeCompanyPlanUser = buildFakeCompanyPlanUser();
  return {
    sut,
    fakeCompanyPlanUser,
  };
};

describe('Company Plan User', () => {
  it('should be able to create a company plan user', async () => {
    const { sut, fakeCompanyPlanUser } = makeSut();
    prismaMock.company_plan_users.create.mockResolvedValueOnce({
      id: 1,
      user_id: 'user_id',
      flg_active: false,
      company_plan_id: 1,
    });
    const created = await sut.create(fakeCompanyPlanUser);
    expect(created).toBe(true);
  });

  it('should be able to activate a company plan user', async () => {
    const { sut } = makeSut();
    prismaMock.company_plan_users.update.mockResolvedValueOnce({
      id: 1,
      flg_active: true,
      company_plan_id: 1,
      user_id: 'user_id',
    });
    const activate = await sut.activate(1);
    expect(activate).toBe(true);
  });

  it('should be able to inactivate a company plan user', async () => {
    const { sut } = makeSut();
    prismaMock.company_plan_users.update.mockResolvedValueOnce({
      id: 1,
      flg_active: false,
      company_plan_id: 1,
      user_id: 'user_id',
    });
    const activate = await sut.inactivate(1);
    expect(activate).toBe(false);
  });
});
