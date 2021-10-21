import { GetModuleService } from 'data/services/module';
import { CustomError } from 'domain/errors';
import { GetModulesController } from 'presentation/controllers/module';
import { throwError } from '__tests__/factory/error-test';

jest.mock('data/services/module');

const GetModuleServiceMock = GetModuleService as jest.Mock<GetModuleService>;

const makeSut = () => {
  const getModuleServiceMock = new GetModuleServiceMock() as jest.Mocked<GetModuleService>;
  const sut = new GetModulesController(getModuleServiceMock);

  return {
    sut,
    getModuleServiceMock,
  };
};

const fakeRequest = {
  originalUrl: 'url',
  body: {},
  params: {
    id: 'userId',
  },
};

describe('Get Modules Controller', () => {
  it('should be able to list the user modules', async () => {
    const { sut, getModuleServiceMock } = makeSut();

    getModuleServiceMock.list.mockResolvedValueOnce([
      {
        id: 1,
        name: 'Module',
        icon: 'icon',
        position: 1,
        routines: [
          {
            name: 'name_routine',
            link: 'link',
            position: 1,
            icon: 'icon_routine',
          },
        ],
      },
    ]);
    const response = await sut.handle(fakeRequest);
    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(200);
  });

  it('should trhows if get module service throws a server error', async () => {
    const { sut, getModuleServiceMock } = makeSut();

    getModuleServiceMock.list.mockRejectedValueOnce(throwError);

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(500);
    }
  });

  it('should trhows if get modules service throws a bad request error', async () => {
    const { sut, getModuleServiceMock } = makeSut();

    getModuleServiceMock.list.mockRejectedValueOnce(new CustomError('', 400, '', ''));

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(400);
    }
  });
});
