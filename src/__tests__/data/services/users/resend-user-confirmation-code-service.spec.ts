import { ResendUserConfirmationCodeService } from 'data/services/users';
import { CognitoAdapterStub } from '__tests__/factory';
import { throwError } from '__tests__/factory/error-test';

interface SutTypes {
  sut: ResendUserConfirmationCodeService;
  authenticatorAdapterStub: CognitoAdapterStub;
}

const makeSut = (): SutTypes => {
  const authenticatorAdapterStub = new CognitoAdapterStub();
  const sut = new ResendUserConfirmationCodeService(authenticatorAdapterStub);

  return {
    sut,
    authenticatorAdapterStub,
  };
};

describe('Resendo User Confirmation Code Service', () => {
  it('should be able to confirm user', async () => {
    const { sut } = makeSut();
    const confirmed = await sut.resendCode('user@email.com');
    expect(confirmed).toBe(true);
  });

  it('should throws an error if authentication service throws', async () => {
    const { sut, authenticatorAdapterStub } = makeSut();
    jest.spyOn(authenticatorAdapterStub, 'resendConfirmationCode').mockImplementationOnce(throwError);
    const promise = sut.resendCode('user@email.com');
    await expect(promise).rejects.toThrow();
  });
});
