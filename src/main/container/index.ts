import { container } from 'tsyringe';

import { Authenticator } from 'data/protocols/security';
import { CognitoAdapter } from 'infra/security/auth/cognito-adapter';
import {
  IAccessControlRepository,
  IBusinessPlanSettingsRepository,
  ICompanyPlanPaymentControlRepository,
  ICompanyPlanUsersRepository,
  ICompanyRepository,
  IModuleRepository,
  ISessionRepository,
  IUserMeasuersRepository,
  IUserRepository,
} from 'data/protocols/db';
import { ICompanyPlanRepository } from 'data/protocols/db/i-company-plan';
import {
  AccessControlRepository,
  BusinessPlanSettingsRepository,
  CompanyPlanPaymentControlRepository,
  CompanyPlanRepository,
  CompanyPlanUserRepository,
  CompanyRepository,
  ModuleRepository,
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
container.registerSingleton<IModuleRepository>('ModuleRepository', ModuleRepository);
container.registerSingleton<IBusinessPlanSettingsRepository>(
  'BusinessPlanSettingsRepository',
  BusinessPlanSettingsRepository,
);
container.registerSingleton<IAccessControlRepository>('AccessControlRepository', AccessControlRepository);
container.registerSingleton<ICompanyRepository>('CompanyRepository', CompanyRepository);
