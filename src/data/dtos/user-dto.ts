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
  sub?: string;
};

export type UserUpdateDTO = {
  familyName: string;
  givenName: string;
  address: string;
  phoneNumber: string;
  id: string;
};

export type UserProfileDTO = {
  user: {
    email: string;
    name: string;
    address: string;
    phoneNumber: string;
    flgConfirmed: boolean;
    flgActive: boolean;
    gender: string;
    headquarter: string;
    profilePic: string;
    givenName: string;
    familyName: string;
    id: string;
  };
  plan: {
    lastPaymentDate: string;
    nextPaymentDate: string;
    name: string;
    value: number;
    overdue: boolean;
  };
};

export type UserListDTO = {
  allowAddNewUser: boolean;
  pages: number;
  totalUsers: number;
  totalAdmins: number;
  totalRecords: number;
  users: [
    {
      id: string;
      plan: string;
      email: string;
      status: string;
      fullName: string;
      documentId: string;
    },
  ];
};

export type UserListRequestDto = {
  companyId: string;
  roleId: number;
  page: number;
  records: number;
  orderDirection: string;
  queryField: string;
};

export type UserCompleteDTO = {
  givenName: string;
  familyName: string;
  documentType: number;
  documentId: string;
  address: string;
  phoneNumber: string;
  email: string;
  birthdate: Date;
  gender: string;
  headquarterId: number;
  role: number;
};
