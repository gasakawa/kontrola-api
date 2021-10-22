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
