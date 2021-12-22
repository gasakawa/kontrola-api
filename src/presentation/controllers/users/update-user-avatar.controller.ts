import UpdateUserAvatarService from 'data/services/users/update-user-avatar.service';
import { badRequest, forbidden, ok, serverError } from 'presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from 'presentation/protocols';

export class UpdateUserAvatarController implements Controller {
  constructor(private readonly updateUserAvatarService: UpdateUserAvatarService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;
    const { filename } = httpRequest.file;
    const sub = httpRequest.headers['x-user-sub'] as string;

    try {
      const file = await this.updateUserAvatarService.updateAvatar(id, filename, sub);
      return ok({
        profilePicUrl: file,
        id,
      });
    } catch (error: any) {
      if (error.statusCode === 400) {
        return badRequest(error);
      }
      if (error.statusCode === 403) {
        return forbidden(error);
      }
      return serverError(error);
    }
  }
}
