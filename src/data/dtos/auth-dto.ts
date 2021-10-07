export interface SignupResponseDTO {
  isConfirmed: boolean;
  userSub: string;
}

export interface SigninResponseDTO {
  accessToken: string;
  expiresIn: number;
  idToken?: string;
  refreshToken: string;
  tokenType: string;
  tokenData?: {
    name: string;
    sub: string;
    company: string;
    profile: number;
    sessionId: string;
  };
}
