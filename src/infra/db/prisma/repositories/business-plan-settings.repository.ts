import { IBusinessPlanSettingsRepository } from 'data/protocols/db';
import { BusinessPlanSettings } from 'domain/models';
import prisma from '../client/prisma-client';

export class BusinessPlanSettingsRepository implements IBusinessPlanSettingsRepository {
  async list(bpTypeId: number): Promise<BusinessPlanSettings | null> {
    const result = await prisma.business_plan_settings.findFirst({
      where: {
        business_plan_type_id: bpTypeId,
      },
    });

    if (result) {
      return {
        bpLimitsId: result?.bp_limits_id,
        adminLimit: result?.admin_limit,
        usersLimit: result?.users_limit,
        headquartersLimit: result?.headquarters_limit,
        userProgressTrack: result?.user_progress_track,
        schedule: result.schedule || false,
        accessControl: result.access_control || false,
        sendNotifications: result?.send_notifications || false,
        sendAlerts: result?.send_alerts || false,
        smsPlan: result?.sms_plan || false,
        businessPlanType: result?.business_plan_type_id || 0,
        devicesLimit: result?.devices_limit,
      };
    }

    return null;
  }

  async getLimits(companyId: string): Promise<BusinessPlanSettings> {
    const result = (await prisma.$queryRaw`select * from get_company_plan_limits(${companyId})`) as any;

    const { get_company_plan_limits } = result;
    return get_company_plan_limits as BusinessPlanSettings;
  }
}
