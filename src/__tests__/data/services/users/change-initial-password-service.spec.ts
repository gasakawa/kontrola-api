import { ChangeInitialPasswordService } from 'data/services/users';
import { CognitoAdapterStub, UserRepositoryStub } from '__tests__/factory';
import { throwError } from '__tests__/factory/error-test';

const makeSut = () => {
  const userRepositoryStub = new UserRepositoryStub();
  const cognitoAdapterStub = new CognitoAdapterStub();
  const sut = new ChangeInitialPasswordService(userRepositoryStub, cognitoAdapterStub);

  return {
    userRepositoryStub,
    cognitoAdapterStub,
    sut,
  };
};

describe('Change Initial Password Service', () => {
  it('should be able to change the initial password', async () => {
    const { sut, userRepositoryStub } = makeSut();
    jest.spyOn(userRepositoryStub, 'findByEmail').mockResolvedValueOnce({
      name: 'name',
      address: 'address',
      phoneNumber: 'phone',
      email: 'user@email.com',
      flgActive: false,
      flgConfirmed: false,
      gender: 'S',
    });
    const changed = await sut.change('user@email.com', 'new_password', 'temp_password');

    expect(changed).toBe(true);
  });

  it('shoult throws if authentication service throws', async () => {
    const { sut, cognitoAdapterStub } = makeSut();
    jest.spyOn(cognitoAdapterStub, 'changeInitialPassword').mockRejectedValueOnce(throwError);

    const promise = sut.change('user@email.com', 'new_password', 'temp_password');
    expect(promise).rejects.toThrowError();
  });

  it('should throws if user already confirmed', async () => {
    const { sut } = makeSut();

    try {
      await sut.change('user@email.com', 'new_password', 'temp_password');
    } catch (e) {
      expect(e).toBeTruthy();
      expect(e).toMatchObject({
        message: 'User already confirmed',
        statusCode: 400,
      });
    }
  });
});
