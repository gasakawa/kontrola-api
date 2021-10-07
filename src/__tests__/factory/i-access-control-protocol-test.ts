import { IAccessControlRepository } from 'data/protocols/db';

export class AccessControProtocolStub implements IAccessControlRepository {
  async create(_username: string, _headquarterId: number): Promise<boolean> {
    return new Promise(resolve => resolve(true));
  }
}
