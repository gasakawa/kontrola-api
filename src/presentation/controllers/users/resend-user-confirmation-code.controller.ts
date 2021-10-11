import { ResendUserConfirmationCodeService } from 'data/services/users';
import { badRequest, ok, serverError } from 'presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from 'presentation/protocols';

export class ResendUserConfirmationCodeController implements Controller {
  constructor(private readonly resendUserConfirmationCodeService: ResendUserConfirmationCodeService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { username } = httpRequest.body;

    try {
      await this.resendUserConfirmationCodeService.resendCode(username);
      return ok({
        message: 'User code confirmation sent',
        isConfirmed: false,
      });
    } catch (error: any) {
      if (error.statusCode === 400) {
        return badRequest(error);
      }
      return serverError(error);
    }
  }
}
