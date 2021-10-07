import { HandleUserPasswordService } from 'data/services/users';
import { CustomError } from 'domain/errors';
import { ResetPasswordController } from 'presentation/controllers/users';
import { throwError } from '__tests__/factory/error-test';

jest.mock('data/services/users');

const HandleUserPasswordServiceMock = HandleUserPasswordService as jest.Mock<HandleUserPasswordService>;

const makeSut = () => {
  const handleUserPasswordService = new HandleUserPasswordServiceMock() as jest.Mocked<HandleUserPasswordService>;
  const sut = new ResetPasswordController(handleUserPasswordService);

  return {
    sut,
    handleUserPasswordService,
  };
};

const fakeRequest = {
  originalUrl: 'url',
  body: {
    username: 'user@email.com',
    password: 'password',
    code: 'code',
  },
};

describe('Reset Password Controller', () => {
  it('should execute a controller', async () => {
    const { sut, handleUserPasswordService } = makeSut();

    handleUserPasswordService.resetPassword.mockResolvedValue(true);

    const response = await sut.handle(fakeRequest);
    expect(response).toBeTruthy();
    expect(response.body).toHaveProperty('message', 'Password reset');
    expect(response.statusCode).toBe(200);
  });

  it('should trhows if handle user password service throws a server error', async () => {
    const { sut, handleUserPasswordService } = makeSut();

    handleUserPasswordService.resetPassword.mockRejectedValueOnce(throwError);

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(500);
    }
  });

  it('should trhows if handle user password service throws a bad request error', async () => {
    const { sut, handleUserPasswordService } = makeSut();

    handleUserPasswordService.resetPassword.mockRejectedValueOnce(new CustomError('', 400, '', ''));

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(400);
    }
  });
});
