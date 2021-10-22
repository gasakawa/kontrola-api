import { GetBusinessPlanLimitsService } from 'data/services/business-plan';
import { badRequest, ok, serverError } from 'presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from 'presentation/protocols';

export class GetBusinessPlanLimitsController implements Controller {
  constructor(private readonly getBusinessPlanLimitsService: GetBusinessPlanLimitsService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;

    try {
      const limits = await this.getBusinessPlanLimitsService.getLimits(id);
      return ok(limits);
    } catch (error: any) {
      if (error.statusCode === 400) {
        return badRequest(error);
      }
      return serverError(error);
    }
  }
}
