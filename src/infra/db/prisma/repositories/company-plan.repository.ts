import { ICompanyPlanRepository } from 'data/protocols/db/i-company-plan';
import { CompanyPlan } from 'domain/models';
import prisma from 'infra/db/prisma/client/prisma-client';

export class CompanyPlanRepository implements ICompanyPlanRepository {
  async create(companyPlan: CompanyPlan): Promise<boolean> {
    const { name, price, companyId, wayToPay, chargePeriod } = companyPlan;
    await prisma.company_plans.create({
      data: {
        name,
        price,
        company_id: companyId,
        way_to_pay_id: wayToPay,
        charge_period: chargePeriod,
      },
    });

    return true;
  }
}
