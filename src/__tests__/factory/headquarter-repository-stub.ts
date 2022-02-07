import { HeadquarterDTO } from 'data/dtos/headquarter-dto';
import { IHeadquarterRepository } from 'data/protocols/db/i-headquarter.repository';
import { buildFakeDocumentHeadquarters } from './mocks';

export class HeadquarterRepositoryStub implements IHeadquarterRepository {
  async list(_companyId: string): Promise<HeadquarterDTO[] | null> {
    return new Promise(resolve => resolve(buildFakeDocumentHeadquarters()));
  }
}
