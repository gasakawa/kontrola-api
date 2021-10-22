import { UpdateUserService } from 'data/services/users/update-user.service';
import { badRequest, ok, serverError } from 'presentation/helpers/http/http-helper';
import { translate } from 'presentation/helpers/translation';
import { Controller, HttpRequest, HttpResponse } from 'presentation/protocols';

export class UpdateUserController implements Controller {
  constructor(private readonly updateUserService: UpdateUserService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { address, phoneNumber, givenName, familyName } = httpRequest.body;
    const { id } = httpRequest.params;

    try {
      await this.updateUserService.update({
        address,
        phoneNumber,
        givenName,
        familyName,
        id,
      });
      return ok({
        message: translate('UserUpdated', 'User updated', 'success'),
        isUpdated: true,
      });
    } catch (error: any) {
      if (error.statusCode === 400) {
        return badRequest(error);
      }
      return serverError(error);
    }
  }
}
