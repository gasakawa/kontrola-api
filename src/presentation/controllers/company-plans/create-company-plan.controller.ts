import { CreateCompanyPlanService } from 'data/services/company-plan';
import { badRequest, ok, serverError } from 'presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from 'presentation/protocols';

export class CreateCompanyPlanController implements Controller {
  constructor(private readonly createCompanyPlanService: CreateCompanyPlanService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, price, companyId, wayToPay, chargePeriod } = httpRequest.body;

    try {
      await this.createCompanyPlanService.create({ name, price, companyId, wayToPay, chargePeriod });
      return ok({
        message: 'Plan created!',
        isConfirmed: true,
      });
    } catch (error: any) {
      if (error.statusCode === 400) {
        return badRequest(error);
      }
      return serverError(error);
    }
  }
}
