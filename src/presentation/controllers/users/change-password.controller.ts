import { HandleUserPasswordService } from 'data/services/users';
import { badRequest, ok, serverError } from 'presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from 'presentation/protocols';

export class ChangePasswordController implements Controller {
  constructor(private readonly handleUserPasswordService: HandleUserPasswordService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { oldPassword, newPassword } = httpRequest.body;
    const token = httpRequest.headers['x-access-token'];

    try {
      await this.handleUserPasswordService.changePassword(token, oldPassword, newPassword);
      return ok({
        message: 'Password changed',
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
