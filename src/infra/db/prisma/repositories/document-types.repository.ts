import { IDocumentTypeRepository } from 'data/protocols/db';
import { DocumentType } from 'domain/models';
import prisma from '../client/prisma-client';

export class DocumentTypeRepository implements IDocumentTypeRepository {
  async get(): Promise<DocumentType[]> {
    const documents = await prisma.document_types.findMany();

    return documents.map(doc => ({
      id: doc.id,
      name: doc.name,
    })) as DocumentType[];
  }
}
