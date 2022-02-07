import { HeadquarterRepository } from 'infra/db/prisma/repositories';
import { prismaMock } from '__tests__/factory/singleton';

const makeSut = () => {
  const sut = new HeadquarterRepository();

  return {
    sut,
  };
};

describe('Headquarter Repository', () => {
  it('should return headquarter`s list for a company', async () => {
    const { sut } = makeSut();

    prismaMock.headquarters.findMany.mockResolvedValueOnce([
      {
        name: 'headq_1',
        id: 1,
        address: 'address',
        phone_number: 'phone',
        company_id: 'company',
      },
    ]);

    const headquarters = await sut.list('company_id');

    expect(headquarters).toBeTruthy();
    expect(headquarters?.length).toBeGreaterThan(0);
  });
});

describe('Headquarter Repository', () => {
  it('should return null if a company does not have a headquarter', async () => {
    const { sut } = makeSut();

    prismaMock.headquarters.findFirst.mockResolvedValueOnce(null);

    const headquarters = await sut.list('company_id');

    expect(headquarters).toBeUndefined();
  });
});
