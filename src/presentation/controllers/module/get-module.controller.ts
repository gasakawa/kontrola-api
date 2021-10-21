import { GetModuleService } from 'data/services/module';
import { badRequest, ok, serverError } from 'presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from 'presentation/protocols';

export class GetModulesController implements Controller {
  constructor(private readonly getModuleService: GetModuleService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;

    try {
      const modules = await this.getModuleService.list(id);
      return ok(modules);
    } catch (error: any) {
      if (error.statusCode === 400) {
        return badRequest(error);
      }
      return serverError(error);
    }
  }
}
