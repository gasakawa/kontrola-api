import { CreateUserMeasureService } from 'data/services/user-measures';
import { badRequest, ok, serverError } from 'presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from 'presentation/protocols';

export class CreateUserMeasureController implements Controller {
  constructor(private readonly createUserMeasureService: CreateUserMeasureService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { userId, observation, measures } = httpRequest.body;

    try {
      await this.createUserMeasureService.create({
        userId,
        observation,
        measures,
      });
      return ok({
        message: 'User measure saved',
        success: true,
      });
    } catch (error: any) {
      if (error.statusCode === 400) {
        return badRequest(error);
      }
      return serverError(error);
    }
  }
}
