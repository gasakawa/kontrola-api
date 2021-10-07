import { HandleCompanyPlanUserService } from 'data/services/company-plan';
import { badRequest, ok, serverError } from 'presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from 'presentation/protocols';

export class ActivateCompanyPlanUserController implements Controller {
  constructor(private readonly handleCompanyPlanUserService: HandleCompanyPlanUserService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;

    try {
      await this.handleCompanyPlanUserService.activate(Number(id));
      return ok({
        message: 'Control Plan User Activated',
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
