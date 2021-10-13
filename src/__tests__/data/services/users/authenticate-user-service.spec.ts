import { AuthenticateUserService } from 'data/services/users/authenticate-users.service';
import { CustomError } from 'domain/errors';
import { CognitoAdapterStub, UserRepositoryStub, UserSessionRepositoryStub } from '__tests__/factory';

interface SutTypes {
  sut: AuthenticateUserService;
  authRepositoryStub: UserRepositoryStub;
  authenticatorAdapterStub: CognitoAdapterStub;
  userSessionRepository: UserSessionRepositoryStub;
}

const makeSut = (): SutTypes => {
  const authRepositoryStub = new UserRepositoryStub();
  const authenticatorAdapterStub = new CognitoAdapterStub();
  const userSessionRepository = new UserSessionRepositoryStub();
  const sut = new AuthenticateUserService(authRepositoryStub, authenticatorAdapterStub, userSessionRepository);

  return {
    authenticatorAdapterStub,
    authRepositoryStub,
    sut,
    userSessionRepository,
  };
};

describe('Authenticate User Service', () => {
  it('should be able to authenticate an user', async () => {
    const { sut } = makeSut();

    const signinUser = await sut.authenticate('user@email.com', 'password');
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
    const { sut, authRepositoryStub } = makeSut();
    jest.spyOn(authRepositoryStub, 'authenticate').mockReturnValueOnce(new Promise(resolve => resolve(null)));
    try {
      await sut.authenticate('user@email.com', 'password');
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
    const { sut, authRepositoryStub } = makeSut();
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
      await sut.authenticate('user@email.com', 'password');
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
    const { sut, authRepositoryStub } = makeSut();
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
      await sut.authenticate('user@email.com', 'password');
    } catch (e) {
      expect(e).toBeInstanceOf(CustomError);
      expect(e).toMatchObject({
        message: 'User not confirmed',
        statusCode: 400,
        code: 'UserNotConfirmed',
      });
    }
  });
});
