import { inject, injectable } from 'tsyringe';
import { IAccessControlRepository } from 'data/protocols/db';

@injectable()
export class AccessControlService {
  constructor(
    @inject('AccessControlRepository')
    private accessControlRepository: IAccessControlRepository,
  ) {}

  async create(userId: string, headquarterId: number): Promise<boolean> {
    const isCreated = await this.accessControlRepository.create(userId, headquarterId);
    return isCreated;
  }
}
