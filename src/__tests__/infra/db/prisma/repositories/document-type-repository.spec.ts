import { DocumentTypeRepository } from 'infra/db/prisma/repositories/document-types.repository';
import { buildFakeDocumentTypes } from '__tests__/factory/mocks/document-types';
import { prismaMock } from '__tests__/factory/singleton';

const makeSut = () => {
  const sut = new DocumentTypeRepository();

  return {
    sut,
  };
};

describe('Document Type Repository', () => {
  it('should return a list with document types', async () => {
    const { sut } = makeSut();
    prismaMock.document_types.findMany.mockResolvedValue(buildFakeDocumentTypes());
    const documents = await sut.get();

    expect(documents).toBeTruthy();
    expect(documents.length).toBeGreaterThan(0);
  });
});
