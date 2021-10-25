import { CompanyRepository } from 'infra/db/prisma/repositories';
import { prismaMock } from '__tests__/factory/singleton';

const makeSut = () => {
  const sut = new CompanyRepository();

  return {
    sut,
  };
};

describe('Company Repository', () => {
  it('should be able to get a company profile', async () => {
    const { sut } = makeSut();
    prismaMock.companies.findUnique.mockResolvedValueOnce({
      name: 'Company',
      address: 'address',
      phone_number: 'phone_number',
      company_pic_url: 'url',
      id: 'id',
    });
    const company = await sut.get('id');

    expect(company).toBeTruthy();
    expect(company?.name).toBe('Company');
  });

  it('should return null if company not exists', async () => {
    const { sut } = makeSut();
    prismaMock.companies.findUnique.mockResolvedValueOnce(null);
    const company = await sut.get('id');

    expect(company).toBe(null);
  });
});
