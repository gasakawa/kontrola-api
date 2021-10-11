import { ResendUserConfirmationCodeService } from 'data/services/users';
import { CustomError } from 'domain/errors';
import { ResendUserConfirmationCodeController } from 'presentation/controllers/users/resend-user-confirmation-code.controller';
import { throwError } from '__tests__/factory/error-test';

jest.mock('data/services/users');

const ResendUserConfirmationCodeServiceMock =
  ResendUserConfirmationCodeService as jest.Mock<ResendUserConfirmationCodeService>;

const makeSut = () => {
  const resendUserConfirmationCodeServiceMock =
    new ResendUserConfirmationCodeServiceMock() as jest.Mocked<ResendUserConfirmationCodeService>;
  const sut = new ResendUserConfirmationCodeController(resendUserConfirmationCodeServiceMock);

  return {
    sut,
    resendUserConfirmationCodeServiceMock,
  };
};

const fakeRequest = {
  originalUrl: 'url',
  body: {
    userId: 'user_id',
  },
};

describe('Resend User Confirmation Code Controller', () => {
  it('should execute a controller', async () => {
    const { sut, resendUserConfirmationCodeServiceMock } = makeSut();

    resendUserConfirmationCodeServiceMock.resendCode.mockResolvedValue(true);

    const response = await sut.handle(fakeRequest);
    expect(response).toBeTruthy();
    expect(response.body).toHaveProperty('message', 'User code confirmation sent');
    expect(response).toHaveProperty('statusCode', 200);
  });

  it('should trhows if resend user confirmation code service throws a server error', async () => {
    const { sut, resendUserConfirmationCodeServiceMock } = makeSut();

    resendUserConfirmationCodeServiceMock.resendCode.mockRejectedValueOnce(throwError);

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(500);
    }
  });

  it('should trhows if create user service throws a bad request error', async () => {
    const { sut, resendUserConfirmationCodeServiceMock } = makeSut();

    resendUserConfirmationCodeServiceMock.resendCode.mockRejectedValueOnce(new CustomError('', 400, '', ''));

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(400);
    }
  });
});
