import { HandleCompanyPlanUserService } from 'data/services/company-plan';
import { CustomError } from 'domain/errors';
import { CreateCompanyPlanUserController } from 'presentation/controllers/company-plans';
import { throwError } from '__tests__/factory/error-test';

jest.mock('data/services/company-plan');

const HandleCompanyPlanUserServiceMock = HandleCompanyPlanUserService as jest.Mock<HandleCompanyPlanUserService>;

const makeSut = () => {
  const handleCompanyPlanUserServiceMock =
    new HandleCompanyPlanUserServiceMock() as jest.Mocked<HandleCompanyPlanUserService>;
  const sut = new CreateCompanyPlanUserController(handleCompanyPlanUserServiceMock);

  return {
    sut,
    handleCompanyPlanUserServiceMock,
  };
};

const fakeRequest = {
  originalUrl: 'url',
  body: {
    userId: 'user_id',
    companyPlanId: 1,
  },
};

describe('Create Company Plan User Controller', () => {
  it('should be able to create a company plan user ', async () => {
    const { sut } = makeSut();
    const response = await sut.handle(fakeRequest);
    expect(response).toBeTruthy();
    expect(response.body).toHaveProperty('message', 'Control Plan User Created');
    expect(response.statusCode).toBe(200);
  });

  it('should trhows if create company plan user service throws a server error', async () => {
    const { sut, handleCompanyPlanUserServiceMock } = makeSut();

    handleCompanyPlanUserServiceMock.create.mockRejectedValueOnce(throwError);

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(500);
    }
  });

  it('should trhows if create company plan user service throws a bad request error', async () => {
    const { sut, handleCompanyPlanUserServiceMock } = makeSut();

    handleCompanyPlanUserServiceMock.create.mockRejectedValueOnce(new CustomError('', 400, '', ''));

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(500);
    }
  });
});
