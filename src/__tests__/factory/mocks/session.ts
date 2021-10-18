import { SessionModel } from 'domain/models';
import { sessions } from '.prisma/client';

export const buildFakeSession = (): SessionModel => ({
  userId: 'user_id',
  flgActive: true,
  token: 'token',
  company_id: 'company_id',
  sessionInfo: { city: 'city', country: 'country', ip: 'ip', hostname: 'hostname', latitude: 1, longitude: 1 },
});

export const buildFakeDbSession = (): sessions => ({
  user_id: 'user_id',
  token: 'token',
  company_id: 'company_id',
  created_at: new Date(),
  updated_at: new Date(),
  id: 'id',
  flg_active: true,
  session_info: { city: 'city', country: 'country', ip: 'ip', hostname: 'hostname', latitude: 1, longitude: 1 },
});
