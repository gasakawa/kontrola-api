import { DocumentType } from 'domain/models';

export const buildFakeDocumentTypes = (): DocumentType[] => [
  { id: 1, name: 'Type 1' },
  { id: 2, name: 'Type 2' },
  { id: 3, name: 'Type 3' },
];
