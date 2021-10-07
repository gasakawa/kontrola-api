import { HandleUserPasswordService } from 'data/services/users';
import { CustomError } from 'domain/errors';
import { ForgotPasswordController } from 'presentation/controllers/users';
import { throwError } from '__tests__/factory/error-test';

jest.mock('data/services/users');

const HandleUserPasswordServiceMock = HandleUserPasswordService as jest.Mock<HandleUserPasswordService>;

const makeSut = () => {
  const handleUserPasswordService = new HandleUserPasswordServiceMock() as jest.Mocked<HandleUserPasswordService>;
  const sut = new ForgotPasswordController(handleUserPasswordService);

  return {
    sut,
    handleUserPasswordService,
  };
};

const fakeRequest = {
  originalUrl: 'url',
  body: {
    username: 'user@email.com',
  },
};

describe('Forgot Password Controller', () => {
  it('should execute a controller', async () => {
    const { sut, handleUserPasswordService } = makeSut();

    handleUserPasswordService.forgotPassword.mockResolvedValue(true);

    const response = await sut.handle(fakeRequest);
    expect(response).toBeTruthy();
    expect(response.body).toHaveProperty('message', 'Reset Code Send');
    expect(response.statusCode).toBe(200);
  });

  it('should trhows if handle user password service throws a server error', async () => {
    const { sut, handleUserPasswordService } = makeSut();

    handleUserPasswordService.forgotPassword.mockRejectedValueOnce(throwError);

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(500);
    }
  });

  it('should trhows if handle user password service throws a bad request error', async () => {
    const { sut, handleUserPasswordService } = makeSut();

    handleUserPasswordService.forgotPassword.mockRejectedValueOnce(new CustomError('', 400, '', ''));

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(400);
    }
  });
});
