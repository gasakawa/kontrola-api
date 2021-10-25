import { GetCompanyService } from 'data/services/company';
import { badRequest, notFound, ok, serverError } from 'presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from 'presentation/protocols';

export class GetCompanyController implements Controller {
  constructor(private readonly getCompanyService: GetCompanyService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;

    try {
      const accessControl = await this.getCompanyService.get(id);
      return ok(accessControl);
    } catch (error: any) {
      if (error.statusCode === 400) {
        return badRequest(error);
      }
      if (error.statusCode === 404) {
        return notFound(error);
      }
      return serverError(error);
    }
  }
}
