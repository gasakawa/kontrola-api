import { ActivateUserService } from 'data/services/users';
import { CustomError } from 'domain/errors';
import { ActivateUserController } from 'presentation/controllers/users/activate-user.controller';
import { throwError } from '__tests__/factory/error-test';

jest.mock('data/services/users');

const ActivateUserServiceMock = ActivateUserService as jest.Mock<ActivateUserService>;

const makeSut = () => {
  const activateUserServiceMock = new ActivateUserServiceMock() as jest.Mocked<ActivateUserService>;
  const sut = new ActivateUserController(activateUserServiceMock);

  return {
    sut,
    activateUserServiceMock,
  };
};

const fakeRequest = {
  originalUrl: 'url',
  body: {
    userId: 'user_id',
  },
};

describe('Activate User Controller', () => {
  it('should execute a controller', async () => {
    const { sut, activateUserServiceMock } = makeSut();

    activateUserServiceMock.activate.mockResolvedValue(true);

    const response = await sut.handle(fakeRequest);
    expect(response).toBeTruthy();
    expect(response.body).toHaveProperty('message', 'User activated');
    expect(response).toHaveProperty('statusCode', 200);
  });

  it('should trhows if activate user service throws a server error', async () => {
    const { sut, activateUserServiceMock } = makeSut();

    activateUserServiceMock.activate.mockRejectedValueOnce(throwError);

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(500);
    }
  });

  it('should trhows if create user service throws a bad request error', async () => {
    const { sut, activateUserServiceMock } = makeSut();

    activateUserServiceMock.activate.mockRejectedValueOnce(new CustomError('', 400, '', ''));

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(400);
    }
  });
});
