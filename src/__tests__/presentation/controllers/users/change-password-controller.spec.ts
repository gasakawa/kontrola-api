import { HandleUserPasswordService } from 'data/services/users';
import { CustomError } from 'domain/errors';
import { ChangePasswordController } from 'presentation/controllers/users';
import { throwError } from '__tests__/factory/error-test';

jest.mock('data/services/users');

const HandleUserPasswordServiceMock = HandleUserPasswordService as jest.Mock<HandleUserPasswordService>;

const makeSut = () => {
  const handleUserPasswordService = new HandleUserPasswordServiceMock() as jest.Mocked<HandleUserPasswordService>;
  const sut = new ChangePasswordController(handleUserPasswordService);

  return {
    sut,
    handleUserPasswordService,
  };
};

const fakeRequest = {
  originalUrl: 'url',
  body: {
    oldPassword: 'old_password',
    newPassword: 'new_password',
  },
  headers: {
    'x-access-token': 'access_token',
  },
};

describe('Change Password Controller', () => {
  it('should execute a controller', async () => {
    const { sut, handleUserPasswordService } = makeSut();

    handleUserPasswordService.changePassword.mockResolvedValue(true);

    const response = await sut.handle(fakeRequest);
    expect(response).toBeTruthy();
    expect(response.body).toHaveProperty('message', 'Password changed');
    expect(response.statusCode).toBe(200);
  });

  it('should trhows if handle user password service throws a server error', async () => {
    const { sut, handleUserPasswordService } = makeSut();

    handleUserPasswordService.changePassword.mockRejectedValueOnce(throwError);

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(500);
    }
  });

  it('should trhows if handle user password service throws a bad request error', async () => {
    const { sut, handleUserPasswordService } = makeSut();

    handleUserPasswordService.changePassword.mockRejectedValueOnce(new CustomError('', 400, '', ''));

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(400);
    }
  });

  it('should call handle user password service with correct value', async () => {
    const { sut, handleUserPasswordService } = makeSut();
    handleUserPasswordService.changePassword.mockResolvedValue(true);
    await sut.handle(fakeRequest);

    expect(handleUserPasswordService.changePassword).toHaveBeenCalledTimes(1);
    expect(handleUserPasswordService.changePassword).toHaveBeenCalledWith(
      'access_token',
      'old_password',
      'new_password',
    );
  });
});
