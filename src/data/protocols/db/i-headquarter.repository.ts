import { HeadquarterDTO } from 'data/dtos/headquarter-dto';

export interface IHeadquarterRepository {
  list: (companyId: string) => Promise<HeadquarterDTO[] | null>;
}
