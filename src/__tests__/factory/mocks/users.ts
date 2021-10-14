import { UserModel } from 'domain/models';
import { users } from '.prisma/client';

export const buildFakeUser = (): UserModel => ({
  username: 'user@email.com',
  familyName: 'family_name',
  givenName: 'given_name',
  birthdate: 'date_birth',
  email: 'user@email.com',
  roleId: 1,
  companyId: 'company_id',
  documentId: 'document_id',
  documentType: 2,
  address: 'address',
  gender: 'F',
  phoneNumber: '123131313',
  headquarterId: 1,
});

export const buildFakeDbUser = (): users => ({
  given_name: 'given_name',
  id: 'user_id',
  family_name: 'family_name',
  address: 'address',
  phone_number: 'phone_number',
  email: 'user@email.com',
  document_id: 'document_id',
  document_type: 1,
  role_id: 1,
  heaquarter_id: 1,
  flg_active: true,
  flg_confirmed: true,
  sub: 'sub',
  gender: 'M',
  birthdate: new Date(),
  company_id: 'company_id',
  code: 1,
  profile_pic_url: 'url',
  updated_at: new Date(),
  created_at: new Date(),
});
