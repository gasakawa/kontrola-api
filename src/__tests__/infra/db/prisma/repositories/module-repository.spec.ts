import { Module } from 'domain/models';
import { ModuleRepository } from 'infra/db/prisma/repositories';
import { prismaMock } from '__tests__/factory/singleton';

const makeSut = () => {
  const sut = new ModuleRepository();

  return {
    sut,
  };
};

describe('Module Repository', () => {
  it('should be able to get user modules', async () => {
    const { sut } = makeSut();
    prismaMock.$queryRaw.mockResolvedValueOnce([
      {
        get_modules: [
          {
            id: 1,
            name: 'Mis Datos',
            icon: 'icon',
            position: 1,
            routines: [{ name: 'Perfil', link: '/me/profile', position: 1, icon: 'icon' }],
          },
        ],
      },
    ]);
    const response = await sut.list('user_id');

    expect(response).toBeTruthy();
    expect(response).toHaveLength(1);
    expect(response[0]).toMatchObject({
      id: 1,
      name: 'Mis Datos',
      icon: 'icon',
      position: 1,
      routines: [{ name: 'Perfil', link: '/me/profile', position: 1, icon: 'icon' }],
    });
  });
});
