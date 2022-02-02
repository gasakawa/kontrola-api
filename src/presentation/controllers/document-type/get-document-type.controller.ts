import { GetDocumentTypesService } from 'data/services/document-type';
import { badRequest, ok, serverError } from 'presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from 'presentation/protocols';

export class GetDocumentTypeController implements Controller {
  constructor(private readonly getDocumentTypesService: GetDocumentTypesService) {}

  async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const documents = await this.getDocumentTypesService.get();
      return ok(documents);
    } catch (error: any) {
      if (error.statusCode === 400) {
        return badRequest(error);
      }
      return serverError(error);
    }
  }
}
