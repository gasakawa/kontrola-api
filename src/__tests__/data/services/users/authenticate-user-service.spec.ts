import { AuthenticateUserService } from 'data/services/users/authenticate-users.service';
import { CustomError } from 'domain/errors';
import { CognitoAdapterStub, UserRepositoryStub, UserSessionRepositoryStub } from '__tests__/factory';
import { buildFakeSession } from '__tests__/factory/mocks/session';

const makeSut = () => {
  const authRepositoryStub = new UserRepositoryStub();
  const authenticatorAdapterStub = new CognitoAdapterStub();
  const userSessionRepository = new UserSessionRepositoryStub();
  const { sessionInfo } = buildFakeSession();
  const sut = new AuthenticateUserService(authRepositoryStub, authenticatorAdapterStub, userSessionRepository);

  return {
    authenticatorAdapterStub,
    authRepositoryStub,
    sut,
    userSessionRepository,
    fakeSessionInfo: sessionInfo,
  };
};

describe('Authenticate User Service', () => {
  it('should be able to authenticate an user', async () => {
    const { sut, fakeSessionInfo } = makeSut();

    const signinUser = await sut.authenticate('user@email.com', 'password', fakeSessionInfo);
    expect(signinUser).toMatchObject({
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
      tokenType: 'token_type',
      expiresIn: 0,
      tokenData: {
        name: 'User',
        sub: 'sub',
        company: 'company',
        profile: 1,
        sessionId: 'session',
        active: true,
        confirmed: true,
      },
    });
  });

  it('should throw and error when user not found', async () => {
    const { sut, authRepositoryStub, fakeSessionInfo } = makeSut();
    jest.spyOn(authRepositoryStub, 'authenticate').mockReturnValueOnce(new Promise(resolve => resolve(null)));
    try {
      await sut.authenticate('user@email.com', 'password', fakeSessionInfo);
    } catch (e) {
      expect(e).toBeInstanceOf(CustomError);
      expect(e).toMatchObject({
        message: 'User not found',
        statusCode: 404,
        code: 'UserNotFound',
      });
    }
  });

  it('should throw and error when user are inactived', async () => {
    const { sut, authRepositoryStub, fakeSessionInfo } = makeSut();
    jest.spyOn(authRepositoryStub, 'authenticate').mockReturnValueOnce(
      new Promise(resolve =>
        resolve({
          id: 'id',
          email: 'user@email.com',
          name: 'User',
          sub: 'sub',
          company: 'company',
          role: 0,
          flgActive: false,
          flgConfirmed: true,
        }),
      ),
    );
    try {
      await sut.authenticate('user@email.com', 'password', fakeSessionInfo);
    } catch (e) {
      expect(e).toBeInstanceOf(CustomError);
      expect(e).toMatchObject({
        message: 'User inactive',
        statusCode: 400,
        code: 'UserInactive',
      });
    }
  });

  it('should throw and error when user not confirmed itself', async () => {
    const { sut, authRepositoryStub, fakeSessionInfo } = makeSut();
    jest.spyOn(authRepositoryStub, 'authenticate').mockReturnValueOnce(
      new Promise(resolve =>
        resolve({
          id: 'id',
          email: 'user@email.com',
          name: 'User',
          sub: 'sub',
          company: 'company',
          role: 0,
          flgActive: true,
          flgConfirmed: false,
        }),
      ),
    );
    try {
      await sut.authenticate('user@email.com', 'password', fakeSessionInfo);
    } catch (e) {
      expect(e).toBeInstanceOf(CustomError);
      expect(e).toMatchObject({
        message: 'User not confirmed',
        statusCode: 400,
        code: 'UserNotConfirmed',
      });
    }
  });

  it('should block login if number of active sessions is greater than max active session limit', async () => {
    const { sut, userSessionRepository, fakeSessionInfo } = makeSut();
    jest.spyOn(userSessionRepository, 'verifyLimit').mockResolvedValueOnce({
      allowLogin: false,
      email: 'user@email.com',
      userSessionsNumber: 4,
      devicesLimit: 4,
      sessions: [
        {
          id: 'id',
          createdAt: new Date(),
          email: 'user@email.com',
        },
      ],
    });
    const response = await sut.authenticate('user@email.com', 'password', fakeSessionInfo);

    expect(response).toBeTruthy();
    expect(response.accessToken).toBe('NOT_CONFIGURED');
    expect(response.sessionLimits?.allowLogin).toBe(false);
  });
});
