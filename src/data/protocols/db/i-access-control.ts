import { AccessControlDTO } from 'data/dtos';

export interface IAccessControlRepository {
  create(companyId: string, documentId: string, headquarterId: number): Promise<AccessControlDTO>;
}
