import { IUserMeasuersRepository } from 'data/protocols/db';
import { UserMeasureControl } from 'domain/models/user-measure';
import prisma from '../client/prisma-client';

export class UserMeasureRepository implements IUserMeasuersRepository {
  async create(userMeasureControl: UserMeasureControl): Promise<boolean> {
    const { userId, observation, measures } = userMeasureControl;

    await prisma.user_measure_control.create({
      data: {
        user_id: userId,
        observation,
        user_measures: {
          createMany: {
            data: [...measures],
          },
        },
      },
    });

    return true;
  }
}
