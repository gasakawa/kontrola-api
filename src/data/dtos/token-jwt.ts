export type AccessTokenPayload = {
  origin_jti: string;
  sub: string;
  event_id: string;
  token_use: string;
  scope: string;
  auth_time: number;
  iss: string;
  exp: number;
  iat: number;
  jti: string;
  client_id: string;
  username: string;
};

export type AccessTokenDecodedDTO = {
  signature: string;
  header: {
    kid: string;
    alg: string;
  };
  payload: AccessTokenPayload;
};
