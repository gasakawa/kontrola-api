import { ActivateUserService } from 'data/services/users';
import { CustomError } from 'domain/errors';
import { UserRepositoryStub } from '__tests__/factory';

const makeSut = () => {
  const userRepository = new UserRepositoryStub();
  const sut = new ActivateUserService(userRepository);

  return {
    userRepository,
    sut,
  };
};

describe('Activate User Service', () => {
  it('should be able to activate an user', async () => {
    const { sut } = makeSut();
    const activate = await sut.activate('user_id');

    expect(activate).toBe(true);
  });

  it('should throws if user repository throws', async () => {
    const { sut, userRepository } = makeSut();
    jest.spyOn(userRepository, 'find').mockResolvedValueOnce(null);
    try {
      await sut.activate('user_id');
    } catch (e) {
      expect(e).toBeInstanceOf(CustomError);
      expect(e).toMatchObject({
        message: 'User not found',
      });
    }
  });
});
