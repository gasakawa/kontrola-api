import { BusinessPlanSettingsRepository } from 'infra/db/prisma/repositories';
import { prismaMock } from '__tests__/factory/singleton';

const makeSut = () => {
  const sut = new BusinessPlanSettingsRepository();

  return {
    sut,
  };
};

describe('Business Plan Settings Repository', () => {
  it('should be able to get the business plan settings', async () => {
    const { sut } = makeSut();
    prismaMock.business_plan_settings.findFirst.mockResolvedValueOnce({
      bp_limits_id: 1,
      admin_limit: 1,
      users_limit: 4,
      headquarters_limit: 2,
      user_progress_track: true,
      schedule: false,
      access_control: true,
      send_notifications: true,
      send_alerts: true,
      sms_plan: true,
      tech_support: true,
      updates: true,
      permanence_clause: 12,
      devices_limit: 4,
      business_plan_type_id: 1,
    });
    const response = await sut.list(1);

    expect(response).toBeTruthy();
    expect(response?.adminLimit).toBe(1);
  });

  it('should return null if business plan settings not found', async () => {
    const { sut } = makeSut();
    prismaMock.business_plan_settings.findFirst.mockResolvedValueOnce(null);

    const response = await sut.list(1);

    expect(response).toBe(null);
  });

  it('should return business plan limits for a company', async () => {
    const { sut } = makeSut();
    prismaMock.$queryRaw.mockResolvedValueOnce({
      get_company_plan_limits: {
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
      },
    });

    const response = await sut.getLimits('company_id');

    expect(response).toBeTruthy();
    expect(response).toMatchObject({
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
    });
  });
});
