import { HandleUserPasswordService } from 'data/services/users';
import { CognitoAdapterStub } from '__tests__/factory';
import { throwError } from '__tests__/factory/error-test';

interface SutTypes {
  sut: HandleUserPasswordService;
  authenticatorAdapterStub: CognitoAdapterStub;
}

const makeAuthenticatorAdapter = (): CognitoAdapterStub => {
  return new CognitoAdapterStub();
};

const makeSut = (): SutTypes => {
  const authenticatorAdapterStub = makeAuthenticatorAdapter();
  const sut = new HandleUserPasswordService(authenticatorAdapterStub);

  return {
    sut,
    authenticatorAdapterStub,
  };
};

describe('Handle User Password Service', () => {
  it('should be able to ask code for missing password', async () => {
    const { sut } = makeSut();
    const success = await sut.forgotPassword('user@email.com');
    expect(success).toBe(true);
  });

  it('should throws when authentication service throws in forgot password', async () => {
    const { sut, authenticatorAdapterStub } = makeSut();
    jest.spyOn(authenticatorAdapterStub, 'forgotPassword').mockImplementationOnce(throwError);
    const promise = sut.forgotPassword('user@email.com');
    await expect(promise).rejects.toThrow();
  });

  it('should be able to reset password', async () => {
    const { sut } = makeSut();
    const success = await sut.resetPassword('user@email.com', 'password', '121234');
    expect(success).toBe(true);
  });

  it('should throws when authentication service throws in reset passsword', async () => {
    const { sut, authenticatorAdapterStub } = makeSut();
    jest.spyOn(authenticatorAdapterStub, 'resetPassword').mockImplementationOnce(throwError);
    const promise = sut.resetPassword('user@email.com', 'password', '121234');
    await expect(promise).rejects.toThrow();
  });

  it('should be able to change password', async () => {
    const { sut } = makeSut();
    const success = await sut.changePassword('token', 'old_password', 'new_password');
    expect(success).toBe(true);
  });

  it('should throws when authentication service throws in change passsword', async () => {
    const { sut, authenticatorAdapterStub } = makeSut();
    jest.spyOn(authenticatorAdapterStub, 'changePassword').mockImplementationOnce(throwError);
    const promise = sut.changePassword('token', 'old_password', 'new_password');
    await expect(promise).rejects.toThrow();
  });
});
