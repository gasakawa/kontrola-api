import { HandleCompanyPlanUserService } from 'data/services/company-plan';
import { badRequest, ok, serverError } from 'presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from 'presentation/protocols';

export class CreateCompanyPlanUserController implements Controller {
  constructor(private readonly handleCompanyPlanUserService: HandleCompanyPlanUserService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { userId, companyPlanId } = httpRequest.body;

    try {
      await this.handleCompanyPlanUserService.create({
        userId,
        companyPlanId,
      });
      return ok({
        message: 'Control Plan User Created',
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
