import { HandleCompanyPlanUserService } from 'data/services/company-plan';
import { CustomError } from 'domain/errors';
import { ActivateCompanyPlanUserController } from 'presentation/controllers/company-plans/activate-company-plan-user.controller';
import { throwError } from '__tests__/factory/error-test';

jest.mock('data/services/company-plan');

const HandleCompanyPlanUserServiceMock = HandleCompanyPlanUserService as jest.Mock<HandleCompanyPlanUserService>;

const makeSut = () => {
  const handleCompanyPlanUserServiceMock =
    new HandleCompanyPlanUserServiceMock() as jest.Mocked<HandleCompanyPlanUserService>;
  const sut = new ActivateCompanyPlanUserController(handleCompanyPlanUserServiceMock);

  return {
    sut,
    handleCompanyPlanUserServiceMock,
  };
};

const fakeRequest = {
  originalUrl: 'url',
  params: {
    id: '1',
  },
};

describe('Activate Company Plan User Controller', () => {
  it('should be able to activate a company plan user ', async () => {
    const { sut } = makeSut();
    const response = await sut.handle(fakeRequest);
    expect(response).toBeTruthy();
    expect(response.body).toHaveProperty('message', 'Control Plan User Activated');
    expect(response.statusCode).toBe(200);
  });

  it('should trhows if activate company plan user service throws a server error', async () => {
    const { sut, handleCompanyPlanUserServiceMock } = makeSut();

    handleCompanyPlanUserServiceMock.activate.mockRejectedValueOnce(throwError);

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(500);
    }
  });

  it('should trhows if activate company plan user service throws a bad request error', async () => {
    const { sut, handleCompanyPlanUserServiceMock } = makeSut();

    handleCompanyPlanUserServiceMock.activate.mockRejectedValueOnce(new CustomError('', 400, '', ''));

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(500);
    }
  });
});
