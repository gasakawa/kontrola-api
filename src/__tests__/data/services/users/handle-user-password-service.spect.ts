import { HandleUserPasswordService } from 'data/services/users';
import { CognitoAdapterStub, UserRepositoryStub } from '__tests__/factory';
import { throwError } from '__tests__/factory/error-test';

const makeSut = () => {
  const authenticatorAdapterStub = new CognitoAdapterStub();
  const userRepositoryStub = new UserRepositoryStub();
  const sut = new HandleUserPasswordService(authenticatorAdapterStub, userRepositoryStub);

  return {
    sut,
    authenticatorAdapterStub,
    userRepositoryStub,
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

  it('should throws if try to get a new code to reset password for an unregistered email', async () => {
    const { sut, userRepositoryStub } = makeSut();
    jest.spyOn(userRepositoryStub, 'findByEmail').mockResolvedValueOnce(null);

    const promise = sut.forgotPassword('use@email.com');

    expect(promise).rejects.toThrowError('E-mail not found');
  });

  it('should throws if try to reset password for an unregistered email', async () => {
    const { sut, userRepositoryStub } = makeSut();
    jest.spyOn(userRepositoryStub, 'findByEmail').mockResolvedValueOnce(null);

    const promise = sut.resetPassword('use@email.com', 'password', 'code');

    expect(promise).rejects.toThrowError('E-mail not found');
  });
});
