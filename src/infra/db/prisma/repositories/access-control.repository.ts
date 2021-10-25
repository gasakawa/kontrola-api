import { AccessControlDTO } from 'data/dtos';
import { IAccessControlRepository } from 'data/protocols/db';
import prisma from '../client/prisma-client';

export class AccessControlRepository implements IAccessControlRepository {
  async create(companyId: string, documentId: string, headquarterId: number): Promise<AccessControlDTO> {
    const result =
      (await prisma.$queryRaw`select * from access_control_verify(${companyId}, ${documentId}, ${headquarterId})`) as any;
    const [{ access_control_verify }] = result;
    return access_control_verify as AccessControlDTO;
  }
}
