import { Prisma } from '@prisma/client';
import { CustomError } from 'domain/errors';
import { CompanyPlanPaymentControlRepository } from 'infra/db/prisma/repositories';
import { prismaMock } from '__tests__/factory/singleton';

const makeSut = () => {
  const sut = new CompanyPlanPaymentControlRepository();
  return {
    sut,
  };
};

describe('Company Plan Payment Control Repository', () => {
  it('should be able to create a company plan payment record', async () => {
    const { sut } = makeSut();
    const fakeCompanyPlanPayment = {
      userId: 'user_id',
      companyPlan: 1,
      companyId: 'company',
      wayToPay: 1,
      paymentValue: 1500,
    };
    prismaMock.company_plans.findUnique.mockResolvedValue({
      id: 1,
      company_id: 'company_id',
      name: 'name',
      charge_period: 30,
      way_to_pay_id: 1,
      price: new Prisma.Decimal(1500),
    });
    const cp = await sut.create(fakeCompanyPlanPayment);
    expect(cp).toBeTruthy();
    expect(cp).toBe(true);
  });

  it('should be throws if payment value is different to plan price', async () => {
    const { sut } = makeSut();
    const fakeCompanyPlanPayment = {
      userId: 'user_id',
      companyPlan: 1,
      companyId: 'company',
      wayToPay: 1,
      paymentValue: 1500,
    };
    prismaMock.company_plans.findUnique.mockResolvedValue({
      id: 1,
      company_id: 'company_id',
      name: 'name',
      charge_period: 30,
      way_to_pay_id: 1,
      price: new Prisma.Decimal(2500),
    });
    try {
      await sut.create(fakeCompanyPlanPayment);
    } catch (e) {
      expect(e).toBeInstanceOf(CustomError);
      expect(e).toMatchObject({
        message: 'The value of the payment is different than the value of the plan',
        statusCode: 400,
      });
    }
  });
});
