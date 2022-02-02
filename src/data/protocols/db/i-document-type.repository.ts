import { DocumentType } from 'domain/models';

export interface IDocumentTypeRepository {
  get: () => Promise<DocumentType[]>;
}
