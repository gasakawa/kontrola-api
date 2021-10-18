import { SignoutUserService } from 'data/services/users/signout-user.service';
import { UserSessionRepositoryStub } from '__tests__/factory';

const makeSut = () => {
  const userSessionRepositoryStub = new UserSessionRepositoryStub();
  const sut = new SignoutUserService(userSessionRepositoryStub);
  return {
    sut,
    userSessionRepositoryStub,
  };
};

describe('Signout User Service', () => {
  it('should invalidate the user session', async () => {
    const { sut } = makeSut();
    const invalidated = await sut.signout('sessionId');
    expect(invalidated).toBe(true);
  });
});
