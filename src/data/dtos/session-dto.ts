export type SessionLimitDTO = {
  allowLogin: boolean;
  email: string;
  userSessionsNumber: number;
  devicesLimit: number;
  sessions: [
    {
      id: string;
      createdAt: Date;
      email: string;
    },
  ];
};
