import { CreateUserMeasureService } from 'data/services/user-measures';
import { CustomError } from 'domain/errors';
import { CreateUserMeasureController } from 'presentation/controllers/user-measures';
import { throwError } from '__tests__/factory/error-test';

jest.mock('data/services/user-measures');

const CreateUserMeasureServiceMock = CreateUserMeasureService as jest.Mock<CreateUserMeasureService>;

const makeSut = () => {
  const createUserMeasureServiceMock = new CreateUserMeasureServiceMock() as jest.Mocked<CreateUserMeasureService>;
  const sut = new CreateUserMeasureController(createUserMeasureServiceMock);

  return {
    sut,
    createUserMeasureServiceMock,
  };
};

const fakeRequest = {
  originalUrl: 'url',
  body: {
    userId: 'user_id',
    observation: 'observation',
    measures: [
      { measureId: 1, value: 15 },
      { measureId: 2, value: 20 },
    ],
  },
};

describe('Create User Measure Controller', () => {
  it('should be able to create a user measure', async () => {
    const { sut } = makeSut();
    const response = await sut.handle(fakeRequest);
    expect(response).toBeTruthy();
    expect(response.body).toHaveProperty('message', 'User measure saved');
    expect(response.statusCode).toBe(200);
  });

  it('should trhows if create user measure service throws a server error', async () => {
    const { sut, createUserMeasureServiceMock } = makeSut();

    createUserMeasureServiceMock.create.mockRejectedValueOnce(throwError);

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(500);
    }
  });

  it('should trhows if create user measure service throws a bad request error', async () => {
    const { sut, createUserMeasureServiceMock } = makeSut();

    createUserMeasureServiceMock.create.mockRejectedValueOnce(new CustomError('', 400, '', ''));

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(500);
    }
  });
});
