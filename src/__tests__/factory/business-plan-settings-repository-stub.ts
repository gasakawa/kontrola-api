import { IBusinessPlanSettingsRepository } from 'data/protocols/db';
import { BusinessPlanSettings } from 'domain/models';

export class BusinesPlanSettingRepositoryStub implements IBusinessPlanSettingsRepository {
  async getLimits(_userId: string): Promise<BusinessPlanSettings> {
    return new Promise(resolve =>
      resolve({
        adminLimit: 2,
        usersLimit: 100,
        headquartersLimit: 2,
        userProgressTrack: true,
        schedule: true,
        accessControl: true,
        sendNotifications: true,
        sendAlerts: true,
        smsPlan: false,
        devicesLimit: 4,
      }),
    );
  }

  async list(_bpType: number): Promise<BusinessPlanSettings | null> {
    return new Promise(resolve =>
      resolve({
        adminLimit: 2,
        usersLimit: 100,
        headquartersLimit: 2,
        userProgressTrack: true,
        schedule: true,
        accessControl: true,
        sendNotifications: true,
        sendAlerts: true,
        smsPlan: false,
        devicesLimit: 4,
      }),
    );
  }
}
