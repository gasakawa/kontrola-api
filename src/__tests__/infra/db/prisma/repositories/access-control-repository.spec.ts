import { AccessControlRepository } from 'infra/db/prisma/repositories';
import { prismaMock } from '__tests__/factory/singleton';

const makeSut = () => {
  const sut = new AccessControlRepository();

  return {
    sut,
  };
};

describe('Access Control Repository', () => {
  it('should be able to verify access control', async () => {
    const { sut } = makeSut();
    prismaMock.$queryRaw.mockResolvedValueOnce([
      {
        access_control_verify: {
          client: 'Client',
          allowAccess: true,
          daysLeft: 9,
          code: 'AccessGranted',
        },
      },
    ]);
    const response = await sut.create('company_id', 'document_id', 1);

    expect(response).toBeTruthy();
    expect(response.allowAccess).toBe(true);
  });
});
