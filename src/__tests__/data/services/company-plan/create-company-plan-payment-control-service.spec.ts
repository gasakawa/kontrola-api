import { CreateCompanyPlanPaymentControlService } from 'data/services/company-plan';
import { CompanyPlanPaymentControl } from 'domain/models';
import { UserRepositoryStub } from '__tests__/factory';
import { CompanyPlanPaymentControlRepositoryStub } from '__tests__/factory/company-plan-payment-control-repository-test';
import { throwError } from '__tests__/factory/error-test';
import { buildFakeCompanyPlanPaymentControl } from '__tests__/factory/mocks/company-plans';

type SutTypes = {
  sut: CreateCompanyPlanPaymentControlService;
  companyPlanPaymentControlRepositoryStub: CompanyPlanPaymentControlRepositoryStub;
  userRepositoryStub: UserRepositoryStub;
  fakeCompanyPlanPaymentControl: CompanyPlanPaymentControl;
};

const makeSut = (): SutTypes => {
  const companyPlanPaymentControlRepositoryStub = new CompanyPlanPaymentControlRepositoryStub();
  const userRepositoryStub = new UserRepositoryStub();
  const sut = new CreateCompanyPlanPaymentControlService(companyPlanPaymentControlRepositoryStub, userRepositoryStub);
  const fakeCompanyPlanPaymentControl = buildFakeCompanyPlanPaymentControl();
  return {
    sut,
    companyPlanPaymentControlRepositoryStub,
    fakeCompanyPlanPaymentControl,
    userRepositoryStub,
  };
};

describe('Create Company Plan Payment Control Repository', () => {
  it('should be able to create a record for company plan payment', async () => {
    const { sut, fakeCompanyPlanPaymentControl, companyPlanPaymentControlRepositoryStub } = makeSut();
    jest.spyOn(companyPlanPaymentControlRepositoryStub, 'create').mockResolvedValue(true);
    const created = await sut.create(fakeCompanyPlanPaymentControl);
    expect(created).toBe(true);
  });

  it('should be throw if company plan payment control repository throws', async () => {
    const { sut, fakeCompanyPlanPaymentControl, companyPlanPaymentControlRepositoryStub } = makeSut();
    jest.spyOn(companyPlanPaymentControlRepositoryStub, 'create').mockRejectedValueOnce(throwError);
    const promise = sut.create(fakeCompanyPlanPaymentControl);
    expect(promise).rejects.toThrow();
  });

  it('should call ompany plan payment control repository with correct data', async () => {
    const { sut, fakeCompanyPlanPaymentControl, companyPlanPaymentControlRepositoryStub } = makeSut();
    const spy = jest.spyOn(companyPlanPaymentControlRepositoryStub, 'create');
    await sut.create(fakeCompanyPlanPaymentControl);
    expect(spy).toHaveBeenCalledWith(fakeCompanyPlanPaymentControl);
  });
});
