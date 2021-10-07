import { ConfirmUserService } from 'data/services/users';
import { CustomError } from 'domain/errors';
import { ConfirmSignupController } from 'presentation/controllers/users';
import { throwError } from '__tests__/factory/error-test';

jest.mock('data/services/users');

const ConfirmUserServiceMock = ConfirmUserService as jest.Mock<ConfirmUserService>;

const makeSut = () => {
  const confirmUserServiceMock = new ConfirmUserServiceMock() as jest.Mocked<ConfirmUserService>;
  const sut = new ConfirmSignupController(confirmUserServiceMock);

  return {
    sut,
    confirmUserServiceMock,
  };
};

const fakeRequest = {
  originalUrl: 'url',
  body: {
    userId: 'user_id',
  },
};

describe('Confirm Signup Controller', () => {
  it('should execute a controller', async () => {
    const { sut, confirmUserServiceMock } = makeSut();

    confirmUserServiceMock.confirm.mockResolvedValue(true);

    const response = await sut.handle(fakeRequest);
    expect(response).toBeTruthy();
    expect(response.body).toHaveProperty('message', 'User confirmed');
    expect(response).toHaveProperty('statusCode', 200);
  });

  it('should trhows if activate user service throws a server error', async () => {
    const { sut, confirmUserServiceMock } = makeSut();

    confirmUserServiceMock.confirm.mockRejectedValueOnce(throwError);

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(500);
    }
  });

  it('should trhows if create user service throws a bad request error', async () => {
    const { sut, confirmUserServiceMock } = makeSut();

    confirmUserServiceMock.confirm.mockRejectedValueOnce(new CustomError('', 400, '', ''));

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(400);
    }
  });
});
