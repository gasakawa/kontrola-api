import { ICompanyPlanPaymentControlRepository } from 'data/protocols/db';
import { CustomError } from 'domain/errors';
import { CompanyPlanPaymentControl } from 'domain/models';

import prisma from 'infra/db/prisma/client/prisma-client';

export class CompanyPlanPaymentControlRepository implements ICompanyPlanPaymentControlRepository {
  async create(companyPlanPaymentControl: CompanyPlanPaymentControl): Promise<boolean> {
    const { userId, companyId, companyPlan, wayToPay, paymentValue } = companyPlanPaymentControl;

    const plan = await prisma.company_plans.findUnique({
      where: {
        id: companyPlan,
      },
      select: {
        price: true,
      },
    });
    const planValue = Number(plan?.price);
    if (planValue !== paymentValue) {
      throw new CustomError(
        'The value of the payment is different than the value of the plan',
        400,
        'PaymentInvalid',
        'CompanyPlanPaymentError',
      );
    }

    await prisma.company_plan_payments_control.create({
      data: {
        user_id: userId,
        company_plan_id: companyPlan,
        company_id: companyId,
        payment_value: paymentValue,
        way_to_pay_id: wayToPay,
      },
    });

    return true;
  }
}
