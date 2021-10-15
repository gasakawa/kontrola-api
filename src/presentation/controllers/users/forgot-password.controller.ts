import { HandleUserPasswordService } from 'data/services/users';
import { badRequest, notFound, ok, serverError } from 'presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from 'presentation/protocols';

export class ForgotPasswordController implements Controller {
  constructor(private readonly handleUserPasswordService: HandleUserPasswordService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { username } = httpRequest.body;

    try {
      const forgotPassword = await this.handleUserPasswordService.forgotPassword(username);
      return ok({
        message: 'Reset Code Send',
        email: username,
        codeGenerated: forgotPassword,
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
