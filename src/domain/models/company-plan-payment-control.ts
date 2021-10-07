export type CompanyPlanPaymentControl = {
  userId: string;
  companyId: string;
  paymentValue: number;
  paymentDate?: Date;
  wayToPay: number;
  companyPlan: number;
};
