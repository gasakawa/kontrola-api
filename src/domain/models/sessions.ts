export type SessionModel = {
  userId: string;
  flgActive?: boolean;
  token: string;
  createdAt?: Date;
  updatedAt?: Date;
  ipAddress?: string;
  company_id: string;
};
