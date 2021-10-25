import { GetCompanyService } from 'data/services/company';
import { CompanyRepositoryStub } from '__tests__/factory/company-repository-stub';

const makeSut = () => {
  const companyRepositoryStub = new CompanyRepositoryStub();
  const sut = new GetCompanyService(companyRepositoryStub);

  return {
    sut,
    companyRepositoryStub,
  };
};

describe('Get Company Service', () => {
  it('should get a company profile', async () => {
    const { sut } = makeSut();

    const company = await sut.get('company_id');
    expect(company).toBeTruthy();
    expect(company).toMatchObject({
      name: 'Company',
    });
  });

  it('should call company repository with correct data', async () => {
    const { sut, companyRepositoryStub } = makeSut();
    const spy = jest.spyOn(companyRepositoryStub, 'get');
    await sut.get('company_id');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('company_id');
  });
});
