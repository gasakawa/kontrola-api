export type UserModel = {
  id?: string;
  username: string;
  address: string;
  birthdate: string;
  email: string;
  gender: string;
  givenName: string;
  phoneNumber: string;
  familyName: string;
  documentId: string;
  sub?: string;
  roleId: number;
  companyId: string;
  documentType: number;
  headquarterId: number;
};

export type UserSigin = {
  id: string;
  email: string;
  name: string;
  sub: string;
  company: string;
  role: number;
  flgActive: boolean;
  flgConfirmed: boolean;
};
