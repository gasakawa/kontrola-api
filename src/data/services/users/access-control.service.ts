import { inject, injectable } from 'tsyringe';
import { IAccessControlRepository } from 'data/protocols/db';
import { AccessControlDTO } from 'data/dtos';

@injectable()
export class AccessControlService {
  constructor(
    @inject('AccessControlRepository')
    private accessControlRepository: IAccessControlRepository,
  ) {}

  async create(companyId: string, documentId: string, headquarterId: number): Promise<AccessControlDTO> {
    const accessControl = await this.accessControlRepository.create(companyId, documentId, headquarterId);
    return accessControl;
  }
}
