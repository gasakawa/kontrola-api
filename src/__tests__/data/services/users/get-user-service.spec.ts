import { GetUserService } from 'data/services/users';
import { UserRepositoryStub } from '__tests__/factory';

const makeSut = () => {
  const userRepository = new UserRepositoryStub();
  const sut = new GetUserService(userRepository);

  return {
    userRepository,
    sut,
  };
};

describe('Get User Service', () => {
  it('should return a user profile', async () => {
    const { sut } = makeSut();
    const user = await sut.get('user_id');

    expect(user).toBeTruthy();
  });
});