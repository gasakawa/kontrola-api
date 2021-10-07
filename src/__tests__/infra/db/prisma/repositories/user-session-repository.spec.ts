import { CustomError } from 'domain/errors';
import { UserSessionRepository } from 'infra/db/prisma/repositories';
import { buildFakeDbSession, buildFakeSession } from '__tests__/factory/mocks/session';
import { prismaMock } from '__tests__/factory/singleton';

const makeSut = () => {
  const sut = new UserSessionRepository();
  const fakeSession = buildFakeSession();
  const fakeDbSession = buildFakeDbSession();
  return {
    sut,
    fakeSession,
    fakeDbSession,
  };
};

describe('User Session Repository', () => {
  it('should be able to create a session record', async () => {
    const { sut, fakeSession, fakeDbSession } = makeSut();
    prismaMock.sessions.create.mockResolvedValue(fakeDbSession);
    const session = await sut.create(fakeSession);
    expect(session).toBeTruthy();
  });

  it('should throws if exceed session limits', async () => {
    const { sut, fakeSession } = makeSut();
    prismaMock.sessions.create.mockRejectedValue({
      code: 'P2011',
    });
    try {
      await sut.create(fakeSession);
    } catch (e) {
      expect(e).toBeInstanceOf(CustomError);
      expect(e).toMatchObject({
        message: 'Sessions exceed limit',
      });
    }
  });

  it('should throws if any database erro occurs', async () => {
    const { sut, fakeSession } = makeSut();
    prismaMock.sessions.create.mockRejectedValue({
      message: 'Custom Error',
    });
    try {
      await sut.create(fakeSession);
    } catch (e) {
      expect(e).toBeInstanceOf(CustomError);
      expect(e).toMatchObject({
        message: 'An error occurred while creating session',
        statusCode: 500,
      });
    }
  });

  it('should be able to invalidate a session', async () => {
    const { sut, fakeDbSession } = makeSut();

    prismaMock.sessions.findUnique.mockResolvedValue(fakeDbSession);
    prismaMock.sessions.update.mockResolvedValue(fakeDbSession);
    const valid = await sut.invalidate('sesion_id');

    expect(valid).toBe(true);
  });

  it('should return false if session is not found', async () => {
    const { sut } = makeSut();

    prismaMock.sessions.findUnique.mockResolvedValue(null);
    const valid = await sut.invalidate('sesion_id');

    expect(valid).toBe(false);
  });
});
