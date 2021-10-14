import { CreateUserService } from 'data/services/users';
import { UserModel } from 'domain/models';
import { badRequest, ok, serverError } from 'presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from 'presentation/protocols';

export class SignupController implements Controller {
  constructor(private readonly createUserService: CreateUserService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const {
      username,
      phoneNumber,
      birthdate,
      gender,
      address,
      familyName,
      email,
      givenName,
      documentId,
      roleId,
      companyId,
      documentType,
      headquarterId,
    } = httpRequest.body as UserModel;

    try {
      const user = await this.createUserService.create({
        username,
        phoneNumber,
        birthdate,
        gender,
        address,
        familyName,
        email,
        givenName,
        documentId,
        roleId,
        companyId,
        documentType,
        headquarterId,
      });
      return ok(user);
    } catch (error: any) {
      if (error.statusCode === 400) {
        return badRequest(error);
      }
      return serverError(error);
    }
  }
}
