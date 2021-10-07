import { IUserMeasuersRepository } from 'data/protocols/db';
import { UserMeasureControl } from 'domain/models/user-measure';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateUserMeasureService {
  constructor(
    @inject('UserMeasureRepository')
    private readonly userMeasureRepository: IUserMeasuersRepository,
  ) {}

  public async create(userMeasureControl: UserMeasureControl): Promise<boolean> {
    const created = await this.userMeasureRepository.create(userMeasureControl);
    return created;
  }
}
