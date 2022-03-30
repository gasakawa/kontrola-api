import { GetUserCompleteService } from 'data/services/users';
import { badRequest, notFound, ok, serverError } from 'presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from 'presentation/protocols';

export class GetUserCompleteController implements Controller {
  constructor(private readonly getUserCompleteService: GetUserCompleteService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;

    try {
      const user = await this.getUserCompleteService.get(id);
      return ok(user);
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
