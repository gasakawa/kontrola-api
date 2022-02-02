import { GetDocumentTypesService } from 'data/services/document-type';
import { GetDocumentTypeController } from 'presentation/controllers/document-type';
import { Controller } from 'presentation/protocols';
import { container } from 'tsyringe';

export const makeGetDocumentTypeController = (): Controller => {
  const documentTypeService = container.resolve(GetDocumentTypesService);
  return new GetDocumentTypeController(documentTypeService);
};
