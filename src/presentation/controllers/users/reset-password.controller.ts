import { HandleUserPasswordService } from 'data/services/users';
import { badRequest, notFound, ok, serverError } from 'presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from 'presentation/protocols';

export class ResetPasswordController implements Controller {
  constructor(private readonly handleUserPasswordService: HandleUserPasswordService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { username, password, code } = httpRequest.body;

    try {
      const resetPassword = await this.handleUserPasswordService.resetPassword(username, password, code);
      return ok({
        message: 'Password reset',
        email: username,
        resetPassword,
      });
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
