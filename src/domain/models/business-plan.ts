export type BusinessPlanSettings = {
  bpLimitsId?: number;
  adminLimit: number;
  usersLimit: number;
  headquartersLimit: number;
  userProgressTrack: boolean;
  schedule: boolean;
  accessControl: boolean;
  sendNotifications: boolean;
  sendAlerts: boolean;
  smsPlan: boolean;
  businessPlanType?: number;
  devicesLimit: number;
};
