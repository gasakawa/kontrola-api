import { CreateUserMeasureService } from 'data/services/user-measures';
import { UserMeasureRepositoryStub } from '__tests__/factory';
import { buildFakeUserMeasureControl } from '__tests__/factory/mocks/user-measure';

const makeSut = () => {
  const userMeasureRepositoryStub = new UserMeasureRepositoryStub();
  const fakeUserMeasure = buildFakeUserMeasureControl();
  const sut = new CreateUserMeasureService(userMeasureRepositoryStub);

  return {
    sut,
    userMeasureRepositoryStub,
    fakeUserMeasure,
  };
};

describe('Create User Measure Service', () => {
  it('should be able to create an user measure record', async () => {
    const { sut, fakeUserMeasure, userMeasureRepositoryStub } = makeSut();
    jest.spyOn(userMeasureRepositoryStub, 'create').mockResolvedValueOnce(true);
    const created = await sut.create(fakeUserMeasure);
    expect(created).toBe(true);
  });

  it('should be call user measure repository with correct data', async () => {
    const { sut, fakeUserMeasure, userMeasureRepositoryStub } = makeSut();

    const spy = jest.spyOn(userMeasureRepositoryStub, 'create');

    await sut.create(fakeUserMeasure);
    expect(spy).toHaveBeenCalledWith(fakeUserMeasure);
    expect(spy).toBeCalledTimes(1);
  });

  it('should throws if create user measure repository throws', async () => {
    const { sut, fakeUserMeasure, userMeasureRepositoryStub } = makeSut();
    jest.spyOn(userMeasureRepositoryStub, 'create').mockRejectedValueOnce(new Error());

    try {
      await sut.create(fakeUserMeasure);
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
