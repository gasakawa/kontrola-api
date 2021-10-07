import { AccessControlService } from 'data/services/users/access-control.service';
import { AccessControProtocolStub } from '__tests__/factory';

interface SutTypes {
  sut: AccessControlService;
  accessControlRepositoryStub: AccessControProtocolStub;
}

const makeSut = (): SutTypes => {
  const accessControlRepositoryStub = new AccessControProtocolStub();
  const sut = new AccessControlService(accessControlRepositoryStub);
  return {
    sut,
    accessControlRepositoryStub,
  };
};

describe('AccessControlService', () => {
  it('should create a access control record', async () => {
    const { sut } = makeSut();
    const isCreated = await sut.create('user_id', 1);
    expect(isCreated).toBe(true);
  });
});
