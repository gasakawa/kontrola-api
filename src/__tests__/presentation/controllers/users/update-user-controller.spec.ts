import { UpdateUserService } from 'data/services/users';
import { CustomError } from 'domain/errors';
import { UpdateUserController } from 'presentation/controllers/users';
import { throwError } from '__tests__/factory/error-test';

jest.mock('data/services/users');

const UpdateUserServiceMock = UpdateUserService as jest.Mock<UpdateUserService>;

const makeSut = () => {
  const updateUserServiceMock = new UpdateUserServiceMock() as jest.Mocked<UpdateUserService>;
  const sut = new UpdateUserController(updateUserServiceMock);

  return {
    sut,
    updateUserServiceMock,
  };
};

const fakeRequest = {
  originalUrl: 'url',
  body: {
    givenName: 'given_name',
    familyName: 'familyName',
    address: 'address',
    phoneNumber: 'phoneNumber',
  },
  params: {
    id: 'user_id',
  },
};

describe('Update User Controller', () => {
  it('should execute a controller', async () => {
    const { sut, updateUserServiceMock } = makeSut();

    updateUserServiceMock.update.mockResolvedValue(true);

    const response = await sut.handle(fakeRequest);
    expect(response).toBeTruthy();
    expect(response.body).toHaveProperty('message', 'User updated');
    expect(response).toHaveProperty('statusCode', 200);
  });

  it('should trhows if update user service throws a server error', async () => {
    const { sut, updateUserServiceMock } = makeSut();

    updateUserServiceMock.update.mockRejectedValueOnce(throwError);

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(500);
    }
  });

  it('should trhows if update user service throws a bad request error', async () => {
    const { sut, updateUserServiceMock } = makeSut();

    updateUserServiceMock.update.mockRejectedValueOnce(new CustomError('', 400, '', ''));

    try {
      await sut.handle(fakeRequest);
    } catch (e: any) {
      expect(e.statusCode).toBe(400);
    }
  });
});
