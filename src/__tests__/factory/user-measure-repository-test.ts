import { IUserMeasuersRepository } from 'data/protocols/db';
import { UserMeasureControl } from 'domain/models/user-measure';

export class UserMeasureRepositoryStub implements IUserMeasuersRepository {
  async create(_userMeasure: UserMeasureControl): Promise<boolean> {
    return new Promise(resolve => resolve(true));
  }
}
