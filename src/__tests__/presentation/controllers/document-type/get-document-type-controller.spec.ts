import { GetDocumentTypesService } from 'data/services/document-type';
import { GetDocumentTypeController } from 'presentation/controllers/document-type';
import { buildFakeDocumentTypes } from '__tests__/factory/mocks/document-types';

jest.mock('data/services/document-type');

const GetDocumentTypesServiceMock = GetDocumentTypesService as jest.Mock<GetDocumentTypesService>;

const makeSut = () => {
  const documentTypeServiceMock = new GetDocumentTypesServiceMock() as jest.Mocked<GetDocumentTypesService>;
  const sut = new GetDocumentTypeController(documentTypeServiceMock);

  return {
    sut,
    documentTypeServiceMock,
  };
};

const fakeRequest = {
  originalUrl: 'url',
};

describe('Get Document Types Controller', () => {
  it('should be able to list the document types', async () => {
    const { sut, documentTypeServiceMock } = makeSut();

    documentTypeServiceMock.get.mockResolvedValueOnce(buildFakeDocumentTypes());
    const response = await sut.handle(fakeRequest);
    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(200);
  });
});
