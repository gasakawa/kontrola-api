import { CustomError } from 'domain/errors';
import { JWTHandler } from 'main/handler/jwt/jwt-handler';

describe('JWT Handler', () => {
  it('should validate token structure', () => {
    const token = 'first.second';
    try {
      JWTHandler.decodeAccessToken(token);
    } catch (e) {
      expect(e).toBeInstanceOf(CustomError);
      expect(e).toMatchObject({
        name: 'TokenError',
        message: 'Token JWT incorrect format',
        statusCode: 401,
        code: 'JWTIncorrect',
      });
    }
  });

  it('should decode a token', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const decode = JWTHandler.decodeAccessToken(token);
    expect(decode).toBeTruthy();
    expect(decode).toHaveProperty('header');
  });

  it('should throws when a token signature is invalid', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    try {
      JWTHandler.verifyAccessToken(token);
    } catch (e: any) {
      expect(e).toBeTruthy();
      expect(e).toBeInstanceOf(CustomError);
      expect(e.message).toBe('Token with invalid signature');
    }
  });
});
