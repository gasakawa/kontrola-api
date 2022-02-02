import { IDocumentTypeRepository } from 'data/protocols/db';
import { DocumentType } from 'domain/models';
import { buildFakeDocumentTypes } from './mocks/document-types';

export class DocumentTypeRepositoryStub implements IDocumentTypeRepository {
  async get(): Promise<DocumentType[]> {
    return new Promise(resolve => resolve(buildFakeDocumentTypes()));
  }
}
