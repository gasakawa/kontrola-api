export type UserAuthDTO = {
  email: string;
  sub?: string;
  isConfirmed: boolean;
};

export type UserDTO = {
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  flgActive: boolean;
  flgConfirmed: boolean;
  gender: string;
};

export type UserUpdateDTO = {
  familyName: string;
  givenName: string;
  address: string;
  phoneNumber: string;
  id: string;
};

export type UserProfileDTO = {
  email: string;
  name: string;
  address: string;
  phoneNumber: string;
  flgActive: boolean;
  flgConfirmed: boolean;
  gender: string;
  headquarter: string;
  profilePic: string;
  plan: {
    lastPaymentDate: string;
    nextPaymentDate: string;
    name: string;
    value: number;
  };
  givenName: string;
  familyName: string;
  id: string;
};

export type UserListDTO = {
  allowAddNewUser: boolean;
  pages: number;
  totalUsers: number;
  totalAdmins: number;
  users: [
    {
      id: string;
      plan: string;
      email: string;
      status: string;
      fullName: string;
    },
  ];
};
