import { CompanyPlan, CompanyPlanPaymentControl, CompanyPlanUser } from 'domain/models';

export const buildFakeCompanyPlan = (): CompanyPlan => ({
  name: 'plan_name',
  price: 100,
  companyId: 'company_id',
  wayToPay: 1,
  chargePeriod: 30,
});

export const buildFakeCompanyPlanPaymentControl = (): CompanyPlanPaymentControl => ({
  userId: 'user_id',
  companyId: 'company_id',
  paymentValue: 100,
  wayToPay: 1,
  companyPlan: 1,
});

export const buildFakeCompanyPlanUser = (): CompanyPlanUser => ({
  companyPlanId: 1,
  userId: 'user_id',
  flgActive: false,
});
