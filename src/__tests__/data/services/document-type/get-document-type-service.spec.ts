import { GetDocumentTypesService } from 'data/services/document-type';
import { DocumentTypeRepositoryStub } from '__tests__/factory/document-type-repository-stub';

const makeSut = () => {
  const documentTypeRepositoryStub = new DocumentTypeRepositoryStub();
  const sut = new GetDocumentTypesService(documentTypeRepositoryStub);
  return {
    sut,
    documentTypeRepositoryStub,
  };
};

describe('Document Type Service', () => {
  it('should return a list of document types', async () => {
    const { sut } = makeSut();

    const documents = await sut.get();

    expect(documents).toBeTruthy();
    expect(documents.length).toBeGreaterThan(0);
  });
});
