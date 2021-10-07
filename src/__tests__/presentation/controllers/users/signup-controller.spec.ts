import { CreateUserService } from 'data/services/users';
import { CustomError } from 'domain/errors';
import { SignupController } from 'presentation/controllers/users';
import { throwError } from '__tests__/factory/error-test';

jest.mock('data/services/users');

const CreateUserServiceMock = CreateUserService as jest.Mock<CreateUserService>;

const makeSut = () => {
  const createUserServiceMock = new CreateUserServiceMock() as jest.Mocked<CreateUserService>;
  const sut = new SignupController(createUserServiceMock);

  return {
    sut,
    createUserServiceMock,
  };
};

const fakeRequest = {
  originalUrl: 'url',
  body: {
    username: 'user@email.com',
    password: 'password',
    phoneNumber: 'phone',
    birthdate: 'birthdate',
    gender: 'M',
    address: 'address',
    familyName: 'family_name',
    email: 'user@email.com',
    givenName: 'given_name',
    documentId: 'document_id',
    roleId: 1,
    companyId: 'company_id',
    documentType: 1,
    headquarterId: 1,
  },
};

describe('Signup Controller', () => {
  it('should execute a controller', async () => {
    const { sut, createUserServiceMock } = makeSut();

    createUserServiceMock.create.mockResolvedValue({
      email: 'user@email.com',
      sub: 'sub',
      isConfirmed: false,
    });

    const response = await sut.handle(fakeRequest);
    expect(response).toBeTruthy();
    expect(response.body).toMatchObject({
      email: 'user@email.com',
      sub: 'sub',
      isConfirmed: false,
    });
  });

  it('should trhows if create user service throws a server error', async () => {
    const { sut, createUserServiceMock } = makeSut();

    createUserServiceMock.create.mockRejectedValueOnce(throwError);

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(500);
    }
  });

  it('should trhows if create user service throws a bad request error', async () => {
    const { sut, createUserServiceMock } = makeSut();

    createUserServiceMock.create.mockRejectedValueOnce(new CustomError('', 400, '', ''));

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(400);
    }
  });
});
