import { IAccessControlRepository } from 'data/protocols/db';

export class AccessControlRepository implements IAccessControlRepository {
  async create(_userId: string, _headquarterId: number): Promise<boolean> {
    return true;
  }
}
