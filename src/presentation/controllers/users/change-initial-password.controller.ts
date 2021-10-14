import { ChangeInitialPasswordService } from 'data/services/users';
import { badRequest, ok, serverError } from 'presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from 'presentation/protocols';

export class ChangeInitialPasswordController implements Controller {
  constructor(private readonly changeInitialPasswordService: ChangeInitialPasswordService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { username, password, tempPassword } = httpRequest.body;

    try {
      await this.changeInitialPasswordService.change(username, password, tempPassword);
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
