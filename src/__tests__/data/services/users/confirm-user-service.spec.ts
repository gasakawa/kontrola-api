import { ConfirmUserService } from 'data/services/users';
import { UserRepositoryStub, CognitoAdapterStub } from '__tests__/factory';
import { throwError } from '__tests__/factory/error-test';

interface SutTypes {
  sut: ConfirmUserService;
  userRepositoryStub: UserRepositoryStub;
  authenticatorAdapterStub: CognitoAdapterStub;
}

const makeAuthRepository = (): UserRepositoryStub => {
  return new UserRepositoryStub();
};

const makeAuthenticatorAdapter = (): CognitoAdapterStub => {
  return new CognitoAdapterStub();
};

const makeSut = (): SutTypes => {
  const userRepositoryStub = makeAuthRepository();
  const authenticatorAdapterStub = makeAuthenticatorAdapter();
  const sut = new ConfirmUserService(userRepositoryStub, authenticatorAdapterStub);

  return {
    userRepositoryStub,
    sut,
    authenticatorAdapterStub,
  };
};

describe('Confirm User Service', () => {
  it('should be able to confirm user', async () => {
    const { sut } = makeSut();
    const confirmed = await sut.confirm('user@email.com', '145679');
    expect(confirmed).toBe(true);
  });

  it('should throws an error if authentication service throws', async () => {
    const { sut, authenticatorAdapterStub } = makeSut();
    jest.spyOn(authenticatorAdapterStub, 'confirmSignup').mockImplementationOnce(throwError);
    const promise = sut.confirm('user@email.com', '145679');
    await expect(promise).rejects.toThrow();
  });
});
