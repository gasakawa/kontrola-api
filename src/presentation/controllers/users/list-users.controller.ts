import { ListUsersService } from 'data/services/users';
import { badRequest, notFound, ok, serverError } from 'presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from 'presentation/protocols';

export class ListUsersController implements Controller {
  constructor(private readonly listUsersService: ListUsersService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { companyId } = httpRequest.params;
    const { roleId, page, records, orderDirection, queryField } = httpRequest.query;

    const userListRequestDto = {
      companyId,
      roleId: Number(roleId),
      page: Number(page),
      records: Number(records),
      orderDirection,
      queryField,
    };

    try {
      const users = await this.listUsersService.list(userListRequestDto);
      return ok(users);
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
