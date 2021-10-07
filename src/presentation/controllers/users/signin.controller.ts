import { AuthenticateUserService } from 'data/services/users';
import { badRequest, notFound, ok, serverError } from 'presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from 'presentation/protocols';

export class SigninController implements Controller {
  constructor(private readonly authenticateUserService: AuthenticateUserService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { username, password } = httpRequest.body;

    try {
      const user = await this.authenticateUserService.authenticate(username, password);
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
