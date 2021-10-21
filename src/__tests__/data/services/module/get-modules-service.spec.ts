import { GetModuleService } from 'data/services/module';
import { ModuleRepositoryStub } from '__tests__/factory/module-repository-stub';

const makeSut = () => {
  const moduleRepositoryStub = new ModuleRepositoryStub();
  const sut = new GetModuleService(moduleRepositoryStub);

  return {
    sut,
    moduleRepositoryStub,
  };
};

describe('Get Module Service', () => {
  it('should get user modules', async () => {
    const { sut } = makeSut();

    const modules = await sut.list('user_id');
    expect(modules).toBeTruthy();
    expect(modules).toHaveLength(1);
    expect(modules[0]).toHaveProperty('name', 'Module');
  });
});
