import { inject, injectable } from 'tsyringe';
import { IAccessControlRepository } from 'data/protocols/db';
import { AccessControlDTO } from 'data/dtos';
import { translate } from 'presentation/helpers/translation';

@injectable()
export class AccessControlService {
  constructor(
    @inject('AccessControlRepository')
    private accessControlRepository: IAccessControlRepository,
  ) {}

  async create(companyId: string, documentId: string, headquarterId: number): Promise<AccessControlDTO> {
    const { allowAccess, daysLeft, code, client } = await this.accessControlRepository.create(
      companyId,
      documentId,
      headquarterId,
    );

    return {
      allowAccess,
      daysLeft,
      code,
      client,
      message: translate(code, code, 'success'),
    };
  }
}
