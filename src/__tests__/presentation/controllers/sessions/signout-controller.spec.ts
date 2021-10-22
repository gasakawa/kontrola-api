import { SignoutUserService } from 'data/services/users';
import { CustomError } from 'domain/errors';
import { SignoutController } from 'presentation/controllers/sessions/signout.controller';
import { throwError } from '__tests__/factory/error-test';

jest.mock('data/services/users');

const SignoutUserServiceMock = SignoutUserService as jest.Mock<SignoutUserService>;

const makeSut = () => {
  const signoutUserServiceMock = new SignoutUserServiceMock() as jest.Mocked<SignoutUserService>;
  const sut = new SignoutController(signoutUserServiceMock);

  return {
    sut,
    signoutUserServiceMock,
  };
};

const fakeRequest = {
  originalUrl: 'url',
  body: {},
  params: {
    id: 'sessionId',
  },
};

describe('Signout User Controller', () => {
  it('should be able invalidate a session', async () => {
    const { sut, signoutUserServiceMock } = makeSut();

    signoutUserServiceMock.signout.mockReturnValue(new Promise(resolve => resolve(true)));
    const response = await sut.handle(fakeRequest);
    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(204);
  });

  it('should trhows if get business plan limits throws a server error', async () => {
    const { sut, signoutUserServiceMock } = makeSut();

    signoutUserServiceMock.signout.mockRejectedValueOnce(throwError);

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(500);
    }
  });

  it('should trhows if get business plan limits service throws a bad request error', async () => {
    const { sut, signoutUserServiceMock } = makeSut();

    signoutUserServiceMock.signout.mockRejectedValueOnce(new CustomError('', 400, '', ''));

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(400);
    }
  });
});
