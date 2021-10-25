import { AccessControlService } from 'data/services/users';
import { CustomError } from 'domain/errors';
import { VerifyAccessControlController } from 'presentation/controllers/access-control';
import { throwError } from '__tests__/factory/error-test';

jest.mock('data/services/users');

const AccessControlServiceMock = AccessControlService as jest.Mock<AccessControlService>;

const makeSut = () => {
  const accessControlServiceMock = new AccessControlServiceMock() as jest.Mocked<AccessControlService>;
  const sut = new VerifyAccessControlController(accessControlServiceMock);

  return {
    sut,
    accessControlServiceMock,
  };
};

const fakeRequest = {
  originalUrl: 'url',
  body: {
    companyId: 'company_id',
    documentId: 'document_id',
    headquarterId: 1,
  },
};

describe('Verify Acess Control Controller', () => {
  it('should be able to list the business plan limits', async () => {
    const { sut, accessControlServiceMock } = makeSut();

    accessControlServiceMock.create.mockResolvedValueOnce({
      client: 'Client',
      allowAccess: true,
      daysLeft: 9,
      code: 'AccessGranted',
    });
    const response = await sut.handle(fakeRequest);
    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(200);
  });

  it('should trhows if get business plan limits throws a server error', async () => {
    const { sut, accessControlServiceMock } = makeSut();

    accessControlServiceMock.create.mockRejectedValueOnce(throwError);

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(500);
    }
  });

  it('should trhows if get business plan limits service throws a bad request error', async () => {
    const { sut, accessControlServiceMock } = makeSut();

    accessControlServiceMock.create.mockRejectedValueOnce(new CustomError('', 400, '', ''));

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(400);
    }
  });
});
