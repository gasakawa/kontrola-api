import { UpdateUserService } from 'data/services/users';
import { CustomError } from 'domain/errors';
import { UserRepositoryStub } from '__tests__/factory';
import { buildFakeUpdateUser } from '__tests__/factory/mocks/users';

const makeSut = () => {
  const userRepository = new UserRepositoryStub();
  const sut = new UpdateUserService(userRepository);

  return {
    userRepository,
    sut,
  };
};

const fakeUpdateUser = buildFakeUpdateUser();

describe('Update User Service', () => {
  it('should be able to update an user data', async () => {
    const { sut } = makeSut();
    const activate = await sut.update(fakeUpdateUser);

    expect(activate).toBe(true);
  });

  it('should throws if user repository throws', async () => {
    const { sut, userRepository } = makeSut();
    jest.spyOn(userRepository, 'find').mockResolvedValueOnce(null);
    try {
      await sut.update(fakeUpdateUser);
    } catch (e) {
      expect(e).toBeInstanceOf(CustomError);
      expect(e).toMatchObject({
        message: 'User not found',
      });
    }
  });
});
