import { CustomError } from 'domain/errors';
import { UserRepository } from 'infra/db/prisma/repositories';
import { mockReset } from 'jest-mock-extended';
import { buildFakeDbUser, buildFakeUser } from '__tests__/factory/mocks/users';
import { prismaMock } from '__tests__/factory/singleton';

const makeSut = () => {
  const sut = new UserRepository();
  const fakeUser = buildFakeUser();
  const fakeDbUser = buildFakeDbUser();
  return {
    sut,
    fakeUser,
    fakeDbUser,
  };
};

describe('User Repository', () => {
  beforeEach(() => {
    mockReset(prismaMock);
  });

  it('should find user by email', async () => {
    const { sut, fakeDbUser } = makeSut();
    prismaMock.users.findUnique.mockResolvedValue(fakeDbUser);

    const user = await sut.findByEmail('user@email.com');

    expect(user).toBeTruthy();
    expect(user?.name).toBe('given_name family_name');
  });

  it('should return null if user does not exists', async () => {
    const { sut } = makeSut();
    prismaMock.users.findUnique.mockResolvedValue(null);
    const user = await sut.findByEmail('user@email.com');
    expect(user).toBeNull();
  });

  it('should be able to create an user', async () => {
    const { sut, fakeUser, fakeDbUser } = makeSut();
    prismaMock.users.create.mockResolvedValue(fakeDbUser);
    const user = await sut.create(fakeUser);
    expect(user).toBeTruthy();
    expect(user.email).toBe('user@email.com');
  });

  it('should throw if user already exists', async () => {
    const { sut, fakeUser, fakeDbUser } = makeSut();
    prismaMock.users.findUnique.mockResolvedValue(fakeDbUser);
    try {
      await sut.create(fakeUser);
    } catch (e) {
      expect(e).toBeInstanceOf(CustomError);
    }
  });

  it('should be able to confirm an user', async () => {
    const { sut, fakeDbUser } = makeSut();
    prismaMock.users.update.mockResolvedValueOnce(fakeDbUser);

    const confirmed = await sut.confirmUser('user@email.com');
    expect(confirmed).toBe(true);
  });

  it('should be able authenticate an user', async () => {
    const { sut, fakeDbUser } = makeSut();
    prismaMock.users.findUnique.mockResolvedValueOnce(fakeDbUser);

    const user = await sut.authenticate('user@email.com');
    expect(user).toBeTruthy();
    expect(user?.flgActive).toBe(true);
  });

  it('should return null when authenticate an user if it does not exists', async () => {
    const { sut } = makeSut();
    prismaMock.users.findUnique.mockResolvedValue(null);
    const user = await sut.authenticate('user@email.com');
    expect(user).toBeNull();
  });

  it('should be able to activate an user', async () => {
    const { sut, fakeDbUser } = makeSut();
    prismaMock.users.findUnique.mockResolvedValueOnce(fakeDbUser);
    prismaMock.users.update.mockResolvedValueOnce(fakeDbUser);

    const active = await sut.activate('user@email.com');
    expect(active).toBe(true);
  });

  it('should throws when try activate an user and not found it', async () => {
    const { sut, fakeDbUser } = makeSut();
    Object.assign(fakeDbUser, {
      flg_active: false,
    });
    prismaMock.users.update.mockResolvedValueOnce(fakeDbUser);
    try {
      await sut.activate('user@email.com');
    } catch (e) {
      expect(e).toBeInstanceOf(CustomError);
    }
  });
});
