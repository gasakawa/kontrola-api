import { AccessControlService } from 'data/services/users/access-control.service';
import { AccessControProtocolStub } from '__tests__/factory';

interface SutTypes {
  sut: AccessControlService;
  accessControlRepositoryStub: AccessControProtocolStub;
}

const fakeAccessControl = { allowAccess: true, client: 'Client', code: 'AccessGranted', daysLeft: 9 };

const makeSut = (): SutTypes => {
  const accessControlRepositoryStub = new AccessControProtocolStub();
  const sut = new AccessControlService(accessControlRepositoryStub);
  return {
    sut,
    accessControlRepositoryStub,
  };
};

describe('Access Control Service', () => {
  it('should create a access control record', async () => {
    const { sut } = makeSut();
    const accessControl = await sut.create('company_id', 'document_id', 1);
    expect(accessControl).toMatchObject(fakeAccessControl);
  });

  it('should call access control repository with correct data', async () => {
    const { sut, accessControlRepositoryStub } = makeSut();
    const spy = jest.spyOn(accessControlRepositoryStub, 'create');
    await sut.create('company_id', 'document_id', 1);

    expect(spy).toHaveBeenCalledWith('company_id', 'document_id', 1);
  });
});
