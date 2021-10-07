import { AuthenticateUserService } from 'data/services/users';
import { CustomError } from 'domain/errors';
import { SigninController } from 'presentation/controllers/users';
import { throwError } from '__tests__/factory/error-test';

jest.mock('data/services/users');

const AuthenticateUserServiceMock = AuthenticateUserService as jest.Mock<AuthenticateUserService>;

const makeSut = () => {
  const authenticateUserServiceMock = new AuthenticateUserServiceMock() as jest.Mocked<AuthenticateUserService>;
  const sut = new SigninController(authenticateUserServiceMock);

  return {
    sut,
    authenticateUserServiceMock,
  };
};

const fakeRequest = {
  originalUrl: 'url',
  body: {
    username: 'user@email.com',
    password: 'password',
  },
};

describe('Signin Controller', () => {
  it('should execute a controller', async () => {
    const { sut, authenticateUserServiceMock } = makeSut();

    authenticateUserServiceMock.authenticate.mockResolvedValue({
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      tokenType: 'tokenType',
      expiresIn: 100,
    });

    const response = await sut.handle(fakeRequest);
    expect(response).toBeTruthy();
    expect(response.body).toHaveProperty('accessToken', 'accessToken');
  });

  it('should trhows if authenticate user service throws a server error', async () => {
    const { sut, authenticateUserServiceMock } = makeSut();

    authenticateUserServiceMock.authenticate.mockRejectedValueOnce(throwError);

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(500);
    }
  });

  it('should trhows if create user service throws a bad request error', async () => {
    const { sut, authenticateUserServiceMock } = makeSut();

    authenticateUserServiceMock.authenticate.mockRejectedValueOnce(new CustomError('', 400, '', ''));

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(400);
    }
  });

  it('should trhows if create user service throws a not found error', async () => {
    const { sut, authenticateUserServiceMock } = makeSut();

    authenticateUserServiceMock.authenticate.mockRejectedValueOnce(new CustomError('', 404, '', ''));

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(404);
    }
  });
});
