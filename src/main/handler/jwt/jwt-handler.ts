import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import path from 'path';
import fs from 'fs';
import { AccessTokenDecodedDTO } from 'data/dtos';
import { CustomError } from 'domain/errors';

type JWKS = {
  alg: string;
  kid: string;
  e: string;
  n: string;
  kty: string;
  use: string;
};

export class JWTHandler {
  accessTokenDecoded: AccessTokenDecodedDTO;

  static decodeAccessToken(token: string): AccessTokenDecodedDTO {
    const structure = token.split('.');
    if (structure.length !== 3) {
      throw new CustomError('Token JWT incorrect format', 401, 'JWTIncorrect', 'TokenError');
    }
    return jwt.decode(token, { complete: true }) as AccessTokenDecodedDTO;
  }

  static getJWKSKey(kid: string): JWKS | null {
    const filePath = path.resolve(__dirname, '..', '..', '..', '..');
    const jwksContent = fs.readFileSync(`${filePath}/jwks.json`, 'utf-8');
    const { keys } = JSON.parse(jwksContent);

    const [kidFromKeys] = keys.filter((key: JWKS) => key.kid === kid);
    if (kidFromKeys) {
      return kidFromKeys;
    }
    return null;
  }

  static verifyAccessToken(token: string): void {
    try {
      const { header } = this.decodeAccessToken(token);
      const jwks = this.getJWKSKey(header.kid);

      if (!jwks) {
        throw new CustomError('Token with invalid signature', 400, 'TokenInvalidSignature', 'TokenError');
      }

      const pem = jwkToPem({
        kty: 'RSA',
        n: jwks.n,
        e: jwks.e,
      });

      jwt.verify(token, pem, { algorithms: ['RS256'] });
    } catch (error: any) {
      if (error instanceof Error) throw new CustomError(error.message, 401, 'JWTTokenError', 'TokenError');
    }
  }
}
