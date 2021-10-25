import { AccessControlDTO } from 'data/dtos';
import { IAccessControlRepository } from 'data/protocols/db';

export class AccessControProtocolStub implements IAccessControlRepository {
  async create(_companyId: string, _documentId: string, _headquarterId: number): Promise<AccessControlDTO> {
    return new Promise(resolve =>
      resolve({
        client: 'Client',
        allowAccess: true,
        daysLeft: 9,
        code: 'AccessGranted',
      }),
    );
  }
}
