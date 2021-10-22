import { GetBusinessPlanLimitsService } from 'data/services/business-plan';
import { CustomError } from 'domain/errors';
import { GetBusinessPlanLimitsController } from 'presentation/controllers/business-plan';
import { throwError } from '__tests__/factory/error-test';

jest.mock('data/services/business-plan');

const GetBusinessPlanLimitsServiceMock = GetBusinessPlanLimitsService as jest.Mock<GetBusinessPlanLimitsService>;

const makeSut = () => {
  const getBusinessPlanLimitsServiceMock =
    new GetBusinessPlanLimitsServiceMock() as jest.Mocked<GetBusinessPlanLimitsService>;
  const sut = new GetBusinessPlanLimitsController(getBusinessPlanLimitsServiceMock);

  return {
    sut,
    getBusinessPlanLimitsServiceMock,
  };
};

const fakeRequest = {
  originalUrl: 'url',
  body: {},
  params: {
    id: 'userId',
  },
};

describe('Get Business Plan Limits Controller', () => {
  it('should be able to list the business plan limits', async () => {
    const { sut, getBusinessPlanLimitsServiceMock } = makeSut();

    getBusinessPlanLimitsServiceMock.getLimits.mockResolvedValueOnce({
      adminLimit: 2,
      usersLimit: 100,
      headquartersLimit: 2,
      userProgressTrack: true,
      schedule: true,
      accessControl: true,
      sendNotifications: true,
      sendAlerts: true,
      smsPlan: false,
      devicesLimit: 4,
    });
    const response = await sut.handle(fakeRequest);
    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(200);
  });

  it('should trhows if get business plan limits throws a server error', async () => {
    const { sut, getBusinessPlanLimitsServiceMock } = makeSut();

    getBusinessPlanLimitsServiceMock.getLimits.mockRejectedValueOnce(throwError);

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(500);
    }
  });

  it('should trhows if get business plan limits service throws a bad request error', async () => {
    const { sut, getBusinessPlanLimitsServiceMock } = makeSut();

    getBusinessPlanLimitsServiceMock.getLimits.mockRejectedValueOnce(new CustomError('', 400, '', ''));

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(400);
    }
  });
});
