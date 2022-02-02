import { IDocumentTypeRepository } from 'data/protocols/db';
import { DocumentType } from 'domain/models';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetDocumentTypesService {
  constructor(
    @inject('DocumentTypeRepository')
    private readonly documentTypeRepository: IDocumentTypeRepository,
  ) {}

  public async get(): Promise<DocumentType[]> {
    const documents = await this.documentTypeRepository.get();

    return documents;
  }
}
