import { CreateCompanyPlanPaymentControlService } from 'data/services/company-plan';
import { badRequest, ok, serverError } from 'presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from 'presentation/protocols';

export class CreateCompanyPlanControlController implements Controller {
  constructor(private readonly createCompanyPlanPaymentControlService: CreateCompanyPlanPaymentControlService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { userId, companyId, paymentValue, wayToPay, companyPlan } = httpRequest.body;

    try {
      await this.createCompanyPlanPaymentControlService.create({
        userId,
        companyId,
        paymentValue,
        wayToPay,
        companyPlan,
      });
      return ok({
        message: 'Plan control saved',
        success: true,
      });
    } catch (error: any) {
      if (error.statusCode === 400) {
        return badRequest(error);
      }
      return serverError(error);
    }
  }
}
