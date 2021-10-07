import { container } from 'tsyringe';

import { Authenticator } from 'data/protocols/security';
import { CognitoAdapter } from 'infra/security/auth/cognito-adapter';
import {
  ICompanyPlanPaymentControlRepository,
  ICompanyPlanUsersRepository,
  ISessionRepository,
  IUserMeasuersRepository,
  IUserRepository,
} from 'data/protocols/db';
import { ICompanyPlanRepository } from 'data/protocols/db/i-company-plan';
import {
  CompanyPlanPaymentControlRepository,
  CompanyPlanRepository,
  CompanyPlanUserRepository,
  UserMeasureRepository,
  UserRepository,
  UserSessionRepository,
} from 'infra/db/prisma/repositories';

container.registerSingleton<Authenticator>('CognitoAdapter', CognitoAdapter);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<ISessionRepository>('UserSessionRepository', UserSessionRepository);
container.registerSingleton<ICompanyPlanRepository>('CompanyPlanRepository', CompanyPlanRepository);
container.registerSingleton<ICompanyPlanPaymentControlRepository>(
  'CompanyPlanPaymentControlRepository',
  CompanyPlanPaymentControlRepository,
);

container.registerSingleton<IUserMeasuersRepository>('UserMeasureRepository', UserMeasureRepository);
container.registerSingleton<ICompanyPlanUsersRepository>('CompanyPlanUsersRepository', CompanyPlanUserRepository);
