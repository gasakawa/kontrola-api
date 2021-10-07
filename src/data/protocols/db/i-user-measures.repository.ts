import { UserMeasureControl } from 'domain/models/user-measure';

export interface IUserMeasuersRepository {
  create: (userMeasure: UserMeasureControl) => Promise<boolean>;
}
