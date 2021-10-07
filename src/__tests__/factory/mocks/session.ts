import { SessionModel } from 'domain/models';
import { sessions } from '.prisma/client';

export const buildFakeSession = (): SessionModel => ({
  userId: 'user_id',
  flgActive: true,
  token: 'token',
  company_id: 'company_id',
});

export const buildFakeDbSession = (): sessions => ({
  user_id: 'user_id',
  token: 'token',
  company_id: 'company_id',
  created_at: new Date(),
  updated_at: new Date(),
  id: 'id',
  ip_address: 'ip_address',
  flg_active: true,
});
