export type SessionInfo = {
  ip: string;
  hostname: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
};

export type SessionModel = {
  userId: string;
  flgActive?: boolean;
  token: string;
  createdAt?: Date;
  updatedAt?: Date;
  company_id: string;
  sessionInfo: SessionInfo;
};
