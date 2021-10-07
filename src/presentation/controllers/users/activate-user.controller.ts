import { ActivateUserService } from 'data/services/users';
import { badRequest, ok, serverError } from 'presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from 'presentation/protocols';

export class ActivateUserController implements Controller {
  constructor(private readonly activateUserService: ActivateUserService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { userId } = httpRequest.body;

    try {
      await this.activateUserService.activate(userId);
      return ok({
        message: 'User activated',
        isActive: true,
      });
    } catch (error: any) {
      if (error.statusCode === 400) {
        return badRequest(error);
      }
      return serverError(error);
    }
  }
}
