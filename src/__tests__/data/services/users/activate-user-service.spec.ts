import { ActivateUserService } from 'data/services/users';
import { UserRepositoryStub } from '__tests__/factory';

const makeSut = () => {
  const authRepositoryStub = new UserRepositoryStub();
  const sut = new ActivateUserService(authRepositoryStub);

  return {
    authRepositoryStub,
    sut,
  };
};

describe('Activate User Service', () => {
  it('should be able to activate an user', async () => {
    const { sut } = makeSut();
    const activate = await sut.activate('user_id');

    expect(activate).toBe(true);
  });
});
