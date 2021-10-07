import { ConfirmUserService } from 'data/services/users';
import { badRequest, ok, serverError } from 'presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from 'presentation/protocols';

export class ConfirmSignupController implements Controller {
  constructor(private readonly confirmUserService: ConfirmUserService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { username, code } = httpRequest.body;

    try {
      await this.confirmUserService.confirm(username, code);
      return ok({
        message: 'User confirmed',
        isConfirmed: true,
      });
    } catch (error: any) {
      if (error.statusCode === 400) {
        return badRequest(error);
      }
      return serverError(error);
    }
  }
}
