import { HeadquarterDTO } from 'data/dtos/headquarter-dto';
import { IHeadquarterRepository } from 'data/protocols/db/i-headquarter.repository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListHeadquarterService {
  constructor(
    @inject('HeadquarterRepository')
    private readonly headquarterRepository: IHeadquarterRepository,
  ) {}

  public async list(companyId: string): Promise<HeadquarterDTO[] | null> {
    const headquarters = this.headquarterRepository.list(companyId);

    if (!headquarters) {
      return [];
    }

    return headquarters;
  }
}
