import { SignoutUserService } from 'data/services/users';
import { SignoutController } from 'presentation/controllers/sessions/signout.controller';

jest.mock('data/services/users');

const SignoutUserServiceMock = SignoutUserService as jest.Mock<SignoutUserService>;

const makeSut = () => {
  const createUserMeasureServiceMock = new SignoutUserServiceMock() as jest.Mocked<SignoutUserService>;
  const sut = new SignoutController(createUserMeasureServiceMock);

  return {
    sut,
    createUserMeasureServiceMock,
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
    const { sut, createUserMeasureServiceMock } = makeSut();

    createUserMeasureServiceMock.signout.mockReturnValue(new Promise(resolve => resolve(true)));
    const response = await sut.handle(fakeRequest);
    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(204);
  });
});
