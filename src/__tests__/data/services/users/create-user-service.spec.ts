import { CreateUserService } from 'data/services/users/create-user-service';
import { CustomError } from 'domain/errors';
import { UserModel } from 'domain/models';
import { CognitoAdapterStub, UserRepositoryStub } from '__tests__/factory';
import { throwError } from '__tests__/factory/error-test';
import { buildFakeUser } from '__tests__/factory/mocks/users';

interface SutTypes {
  sut: CreateUserService;
  userRepositoryStub: UserRepositoryStub;
  authenticatorAdapterStub: CognitoAdapterStub;
  fakeUser: UserModel;
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = new UserRepositoryStub();
  const authenticatorAdapterStub = new CognitoAdapterStub();
  const fakeUser = buildFakeUser();
  const sut = new CreateUserService(userRepositoryStub, authenticatorAdapterStub);

  return {
    userRepositoryStub,
    sut,
    authenticatorAdapterStub,
    fakeUser,
  };
};
describe('Create User Service', () => {
  it('should be able to confirm an email', async () => {
    const { sut, fakeUser } = makeSut();
    const user = await sut.create(fakeUser);
    expect(user).toBeTruthy();
    expect(user.email).toEqual('user@email.com');
    expect(user.sub).toBe('sub');
  });

  it('should call authentication service with correct data', async () => {
    const { sut, authenticatorAdapterStub, fakeUser } = makeSut();
    const signupSpy = jest.spyOn(authenticatorAdapterStub, 'signup');
    await sut.create(fakeUser);
    expect(signupSpy).toHaveBeenCalledWith(fakeUser);
  });

  it('should throws when authentication service throws', async () => {
    const { sut, authenticatorAdapterStub, fakeUser } = makeSut();
    jest.spyOn(authenticatorAdapterStub, 'signup').mockImplementationOnce(throwError);
    const promise = sut.create(fakeUser);
    await expect(promise).rejects.toThrow();
  });

  it('should throws if authentication service not return expected data', async () => {
    const { sut, authenticatorAdapterStub, fakeUser } = makeSut();
    jest.spyOn(authenticatorAdapterStub, 'signup').mockResolvedValueOnce({
      userSub: '',
      isConfirmed: false,
    });
    try {
      await sut.create(fakeUser);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error).toMatchObject({
        message: 'Error while signup user',
        statusCode: 500,
        internalCode: 'SingupUserInternalError',
      });
    }
  });
});
