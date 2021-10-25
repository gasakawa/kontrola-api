import { GetCompanyService } from 'data/services/company';
import { CustomError } from 'domain/errors';
import { GetCompanyController } from 'presentation/controllers/company';
import { throwError } from '__tests__/factory/error-test';

jest.mock('data/services/company');

const GetCompanyServiceMock = GetCompanyService as jest.Mock<GetCompanyService>;

const makeSut = () => {
  const getCompanyServiceMock = new GetCompanyServiceMock() as jest.Mocked<GetCompanyService>;
  const sut = new GetCompanyController(getCompanyServiceMock);

  return {
    sut,
    getCompanyServiceMock,
  };
};

const fakeRequest = {
  originalUrl: 'url',
  params: {
    id: 'companyId',
  },
};

const fakeCompany = {
  name: 'Company',
  address: 'address',
  companyPicUrl: 'url',
  id: 'id',
  phoneNumber: 'phone_number',
};

describe('Get Company Controller', () => {
  it('should be able to get a company profile', async () => {
    const { sut, getCompanyServiceMock } = makeSut();

    getCompanyServiceMock.get.mockResolvedValueOnce(fakeCompany);
    const response = await sut.handle(fakeRequest);
    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(200);
  });

  it('should trhows if get company service throws a server error', async () => {
    const { sut, getCompanyServiceMock } = makeSut();

    getCompanyServiceMock.get.mockRejectedValueOnce(throwError);

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(500);
    }
  });

  it('should trhows if get company service throws a bad request error', async () => {
    const { sut, getCompanyServiceMock } = makeSut();

    getCompanyServiceMock.get.mockRejectedValueOnce(new CustomError('', 400, '', ''));

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(400);
    }
  });

  it('should trhows if get company service throws a not found error', async () => {
    const { sut, getCompanyServiceMock } = makeSut();

    getCompanyServiceMock.get.mockRejectedValueOnce(new CustomError('', 404, '', ''));

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(404);
    }
  });
});
