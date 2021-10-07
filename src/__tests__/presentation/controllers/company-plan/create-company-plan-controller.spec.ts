import { CreateCompanyPlanService } from 'data/services/company-plan';
import { CustomError } from 'domain/errors';
import { CreateCompanyPlanController } from 'presentation/controllers/company-plans';
import { throwError } from '__tests__/factory/error-test';

jest.mock('data/services/company-plan');

const CreateCompanyPlanServiceMock = CreateCompanyPlanService as jest.Mock<CreateCompanyPlanService>;

const makeSut = () => {
  const createCompanyPlanServiceMock = new CreateCompanyPlanServiceMock() as jest.Mocked<CreateCompanyPlanService>;
  const sut = new CreateCompanyPlanController(createCompanyPlanServiceMock);

  return {
    sut,
    createCompanyPlanServiceMock,
  };
};

const fakeRequest = {
  originalUrl: 'url',
  body: {
    name: 'name',
    price: 150,
    companyId: 'company_id',
    wayToPay: 1,
    chargePeriod: 30,
  },
};

describe('Create Company Plan Controller', () => {
  it('should be able to create a company plan', async () => {
    const { sut } = makeSut();
    const response = await sut.handle(fakeRequest);
    expect(response).toBeTruthy();
    expect(response.body).toHaveProperty('message', 'Plan created!');
    expect(response.statusCode).toBe(200);
  });

  it('should trhows if create company plan service throws a server error', async () => {
    const { sut, createCompanyPlanServiceMock } = makeSut();

    createCompanyPlanServiceMock.create.mockRejectedValueOnce(throwError);

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(500);
    }
  });

  it('should trhows if create company plan service throws a bad request error', async () => {
    const { sut, createCompanyPlanServiceMock } = makeSut();

    createCompanyPlanServiceMock.create.mockRejectedValueOnce(new CustomError('', 400, '', ''));

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(500);
    }
  });
});
