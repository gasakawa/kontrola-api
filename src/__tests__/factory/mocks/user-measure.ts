import { UserMeasure, UserMeasureControl } from 'domain/models/user-measure';
import { user_measure_control } from '.prisma/client';

export const buildFakeUserMeasure = (): UserMeasure => ({
  measureId: 1,
  value: 15,
  userMeasureControlId: 1,
});

export const buildFakeUserMeasureControl = (): UserMeasureControl => ({
  id: 1,
  userId: 'user_id',
  createdAt: new Date(),
  observation: 'observation',
  measures: [
    {
      measureId: 1,
      value: 10,
      userMeasureControlId: 1,
    },
    {
      measureId: 2,
      value: 10,
      userMeasureControlId: 1,
    },
  ],
});

export const buildFakeDbUserMeasureControl = (): user_measure_control => ({
  id: 1,
  user_id: 'user_id',
  observation: 'observation',
  createdAt: new Date(),
});
