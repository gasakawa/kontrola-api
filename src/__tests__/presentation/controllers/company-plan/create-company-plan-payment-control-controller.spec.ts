import { CreateCompanyPlanPaymentControlService } from 'data/services/company-plan';
import { CustomError } from 'domain/errors';
import { CreateCompanyPlanControlController } from 'presentation/controllers/company-plans';
import { throwError } from '__tests__/factory/error-test';

jest.mock('data/services/company-plan');

const CreateCompanyPlanPaymentControlServiceMock =
  CreateCompanyPlanPaymentControlService as jest.Mock<CreateCompanyPlanPaymentControlService>;

const makeSut = () => {
  const createCompanyPlanPaymentControlServiceMock =
    new CreateCompanyPlanPaymentControlServiceMock() as jest.Mocked<CreateCompanyPlanPaymentControlService>;
  const sut = new CreateCompanyPlanControlController(createCompanyPlanPaymentControlServiceMock);

  return {
    sut,
    createCompanyPlanPaymentControlServiceMock,
  };
};

const fakeRequest = {
  originalUrl: 'url',
  body: {
    userId: 'name',
    paymentValue: 150,
    companyId: 'company_id',
    wayToPay: 1,
    companyPlan: 3,
  },
};

describe('Create Company Plan Control Controller', () => {
  it('should be able to create a company plan payment control', async () => {
    const { sut } = makeSut();
    const response = await sut.handle(fakeRequest);
    expect(response).toBeTruthy();
    expect(response.body).toHaveProperty('message', 'Plan control saved');
    expect(response.statusCode).toBe(200);
  });

  it('should trhows if create company plan service throws a server error', async () => {
    const { sut, createCompanyPlanPaymentControlServiceMock } = makeSut();

    createCompanyPlanPaymentControlServiceMock.create.mockRejectedValueOnce(throwError);

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(500);
    }
  });

  it('should trhows if create company plan service throws a bad request error', async () => {
    const { sut, createCompanyPlanPaymentControlServiceMock } = makeSut();

    createCompanyPlanPaymentControlServiceMock.create.mockRejectedValueOnce(new CustomError('', 400, '', ''));

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(500);
    }
  });
});
