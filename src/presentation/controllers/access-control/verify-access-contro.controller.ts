import { AccessControlService } from 'data/services/users';
import { badRequest, ok, serverError } from 'presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from 'presentation/protocols';

export class VerifyAccessControlController implements Controller {
  constructor(private readonly accessControlService: AccessControlService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { companyId, documentId, headquarterId } = httpRequest.body;

    try {
      const accessControl = await this.accessControlService.create(companyId, documentId, headquarterId);
      return ok(accessControl);
    } catch (error: any) {
      if (error.statusCode === 400) {
        return badRequest(error);
      }
      return serverError(error);
    }
  }
}
