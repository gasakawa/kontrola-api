import { GetUserCompleteService } from 'data/services/users';
import { CustomError } from 'domain/errors';
import { UserRepositoryStub } from '__tests__/factory';

const makeSut = () => {
  const userRepository = new UserRepositoryStub();
  const sut = new GetUserCompleteService(userRepository);

  return {
    userRepository,
    sut,
  };
};

describe('Get User Profile Service', () => {
  it('should return a user profile', async () => {
    const { sut } = makeSut();
    const user = await sut.get('user_id');

    expect(user).toBeTruthy();
  });

  it('should throws if users does not exits', async () => {
    const { sut, userRepository } = makeSut();
    jest.spyOn(userRepository, 'get').mockReturnValueOnce(new Promise(resolve => resolve(null)));
    try {
      await sut.get('user_id');
    } catch (e) {
      expect(e).toBeTruthy();
      expect(e).toBeInstanceOf(CustomError);
    }
  });
});
