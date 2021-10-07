import { UserMeasureRepository } from 'infra/db/prisma/repositories';
import { throwError } from '__tests__/factory/error-test';
import {
  buildFakeUserMeasureControl,
  buildFakeUserMeasure,
  buildFakeDbUserMeasureControl,
} from '__tests__/factory/mocks/user-measure';
import { prismaMock } from '__tests__/factory/singleton';

const makeSut = () => {
  const sut = new UserMeasureRepository();
  const fakeUserMeasure = buildFakeUserMeasure();
  const fakeUserMeasureControl = buildFakeUserMeasureControl();
  const fakeDbUserMeasureControl = buildFakeDbUserMeasureControl();
  return {
    sut,
    fakeUserMeasureControl,
    fakeUserMeasure,
    fakeDbUserMeasureControl,
  };
};

describe('User Measure Repository', () => {
  it('should be able to create a user measure record', async () => {
    const { sut, fakeDbUserMeasureControl, fakeUserMeasureControl } = makeSut();
    prismaMock.user_measure_control.create.mockResolvedValueOnce(fakeDbUserMeasureControl);
    const created = await sut.create(fakeUserMeasureControl);

    expect(created).toBe(true);
  });

  it('should be throws if prisma user measures create throws', async () => {
    const { sut, fakeUserMeasureControl } = makeSut();
    prismaMock.user_measure_control.create.mockRejectedValueOnce(throwError);

    try {
      await sut.create(fakeUserMeasureControl);
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });

  it('should call prisma create method with correct data', async () => {
    const { sut, fakeUserMeasureControl } = makeSut();
    const fakeCreateData = {
      data: {
        user_id: 'user_id',
        observation: 'observation',
        user_measures: {
          createMany: {
            data: [
              { measure_id: 1, value: 10 },
              { measure_id: 2, value: 10 },
            ],
          },
        },
      },
    };
    const spy = jest.spyOn(prismaMock.user_measure_control, 'create');
    await sut.create(fakeUserMeasureControl);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(fakeCreateData);
  });
});
