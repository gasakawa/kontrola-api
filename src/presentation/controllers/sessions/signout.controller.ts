import { SignoutUserService } from 'data/services/users/signout-user.service';
import { badRequest, noContent, serverError } from 'presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from 'presentation/protocols';

export class SignoutController implements Controller {
  constructor(private readonly signoutUserService: SignoutUserService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;

    try {
      await this.signoutUserService.signout(id);
      return noContent();
    } catch (error: any) {
      if (error.statusCode === 400) {
        return badRequest(error);
      }
      return serverError(error);
    }
  }
}
