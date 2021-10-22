import { ChangeInitialPasswordService } from 'data/services/users';
import { CustomError } from 'domain/errors';
import { ChangeInitialPasswordController } from 'presentation/controllers/users';
import { throwError } from '__tests__/factory/error-test';

jest.mock('data/services/users');

const ChangeInitialPasswordServiceMock = ChangeInitialPasswordService as jest.Mock<ChangeInitialPasswordService>;

const makeSut = () => {
  const changeInitialPasswordService =
    new ChangeInitialPasswordServiceMock() as jest.Mocked<ChangeInitialPasswordService>;
  const sut = new ChangeInitialPasswordController(changeInitialPasswordService);

  return {
    sut,
    changeInitialPasswordService,
  };
};

const fakeRequest = {
  originalUrl: 'url',
  body: {
    username: 'user@email.com',
    password: 'password',
    tempPassword: 'temp_password',
  },
};

describe('Change Initial Password Controller', () => {
  it('should execute a controller', async () => {
    const { sut, changeInitialPasswordService } = makeSut();

    changeInitialPasswordService.change.mockResolvedValue(true);

    const response = await sut.handle(fakeRequest);
    expect(response).toBeTruthy();
    expect(response.body).toHaveProperty('message', 'Password changed');
    expect(response.statusCode).toBe(200);
  });

  it('should trhows if change initial password service throws a server error', async () => {
    const { sut, changeInitialPasswordService } = makeSut();

    changeInitialPasswordService.change.mockRejectedValueOnce(throwError);

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(500);
    }
  });

  it('should trhows if change initial password service throws a bad request error', async () => {
    const { sut, changeInitialPasswordService } = makeSut();

    changeInitialPasswordService.change.mockRejectedValueOnce(new CustomError('', 400, '', ''));

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(400);
    }
  });

  it('should call change initial password service with correct value', async () => {
    const { sut, changeInitialPasswordService } = makeSut();
    changeInitialPasswordService.change.mockResolvedValue(true);
    await sut.handle(fakeRequest);

    expect(changeInitialPasswordService.change).toHaveBeenCalledTimes(1);
    expect(changeInitialPasswordService.change).toHaveBeenCalledWith('user@email.com', 'password', 'temp_password');
  });
});
