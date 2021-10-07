import { CompanyPlanRepository } from 'infra/db/prisma/repositories';

const makeSut = () => {
  const sut = new CompanyPlanRepository();
  return {
    sut,
  };
};

describe('Company Plan Repository', () => {
  it('should be able to create a company plan record', async () => {
    const { sut } = makeSut();
    const fakeCompanyPlan = {
      name: 'plan',
      price: 300,
      companyId: 'company',
      wayToPay: 1,
      chargePeriod: 15,
    };
    const cp = await sut.create(fakeCompanyPlan);
    expect(cp).toBeTruthy();
  });
});
