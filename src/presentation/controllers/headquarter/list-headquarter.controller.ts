import { ListHeadquarterService } from 'data/services/headquarter';
import { badRequest, ok, serverError } from 'presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from 'presentation/protocols';

export class ListHeadquarterController implements Controller {
  constructor(private readonly listHeadquarterService: ListHeadquarterService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;
    try {
      const headquarter = await this.listHeadquarterService.list(id);
      return ok(headquarter);
    } catch (error: any) {
      if (error.statusCode === 400) {
        return badRequest(error);
      }
      return serverError(error);
    }
  }
}
