import { NextFunction, Request, Response } from 'express';
import { JWTHandler } from 'main/handler/jwt/jwt-handler';
import { authorize } from 'main/middlewares';

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;
const nextFunction: NextFunction = jest.fn();

const token =
  'eyJraWQiOiJSZGdhdG9GMWFaelVvT0FJbzhHeFVXZHh6T1o4TllBdDhta1JNU3hCWlpNPSIsImFsZyI6IlJTMjU2In0.eyJvcmlnaW5fanRpIjoiODNiMDUzYmUtNzM2NS00MTE1LWE2ZDAtNTNkNWI4Zjc0YWU1Iiwic3ViIjoiZTcxZDg1YjAtOGQ1ZS00MWZmLThlYmItZGM0NTVjMjNjYjU3IiwiZXZlbnRfaWQiOiIwY2MyYWEyMS1lYWE5LTRmODQtYmJkOC00YmNiNzJlYWQ4OWYiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjMzNjIxODQyLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV81NlNubkdmMGgiLCJleHAiOjE2MzM2MjI3NDIsImlhdCI6MTYzMzYyMTg0MiwianRpIjoiMTdhZjAyYmUtMDczYy00M2NiLWIzMzYtOTdiOWMzZTg3MTVlIiwiY2xpZW50X2lkIjoiMTI4ZDJ1bnJxOTI5azV0YjQ1N2trZThjaTAiLCJ1c2VybmFtZSI6ImdhYnJpZWwuYXNha2F3YUBnbWFpbC5jb20ifQ.pTFDOuXZEIA-5eSdYMB0V8TvTZyQdsVFUUM5SoxDm0Ywr3_newUvrCVJ4BOoaYPYrfHWQUbk3gZlECi6oGMZD3uJN0awm2EkcPIYgyn7B7YFDvVOjfNR60eyhRoREB1qaJZxDSJpJIGNvOWIpVnKsr9D3yKjZmmdFJQGumsW5wp5zMXLvMSeTAlXutP9qVlp9xKC6W5eXq81mVZgnvKj9h8eSZTkfJlvFPz68Aff_UeID1eh7nnL28aNH2snAYHT2mv0HL4TveaD5fDQBFQ5J-BONicvii-GUcdh2a3P5stSXgR57Lwg3oPJzHbsATFJd5X71oFJu05tjg0gy9YYMg';

describe('Authorization middleware', () => {
  it('should throw if token is missing ', () => {
    mockRequest = {
      headers: {},
    };
    try {
      authorize(mockRequest as Request, mockResponse as Response, nextFunction);
    } catch (e) {
      expect(e).toBeTruthy();
      expect(e).toMatchObject({
        message: 'Credentials missing',
        statusCode: 401,
      });
    }
  });

  it('should throw session id is missing ', () => {
    mockRequest = {
      headers: {
        'x-access-token': 'token',
      },
    };
    try {
      authorize(mockRequest as Request, mockResponse as Response, nextFunction);
    } catch (e) {
      expect(e).toBeTruthy();
      expect(e).toMatchObject({
        message: 'Session id invalid',
        statusCode: 401,
      });
    }
  });

  it('should throw user sub is missing ', () => {
    mockRequest = {
      headers: {
        'x-access-token': 'token',
        'x-session-id': 'session_id',
      },
    };
    try {
      authorize(mockRequest as Request, mockResponse as Response, nextFunction);
    } catch (e) {
      expect(e).toBeTruthy();
      expect(e).toMatchObject({
        message: 'User sub invalid',
        statusCode: 401,
      });
    }
  });

  it('should call next funcion one time if token is valid', () => {
    mockRequest = {
      headers: {
        'x-access-token': 'token',
        'x-session-id': 'session_id',
        'x-user-sub': 'user_sub',
      },
    };
    jest.spyOn(JWTHandler, 'verifyAccessToken').mockReturnValueOnce();

    jest.spyOn(JWTHandler, 'decodeAccessToken').mockReturnValueOnce({
      payload: {
        sub: 'user_sub',
        origin_jti: 'string',
        event_id: 'string',
        token_use: 'string',
        scope: 'string',
        auth_time: 1,
        iss: 'string',
        exp: 1,
        iat: 1,
        jti: 'string',
        client_id: 'string',
        username: 'string',
      },
      signature: 'signature',
      header: {
        kid: 'kid',
        alg: 'alg',
      },
    });

    authorize(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toBeCalledTimes(1);
  });

  it('should throws if user sub in header is different form user sub in token', () => {
    mockRequest = {
      headers: {
        'x-access-token': token,
        'x-session-id': 'session_id',
        'x-user-sub': 'user_sub',
      },
    };

    jest.spyOn(JWTHandler, 'verifyAccessToken').mockReturnValueOnce();

    jest.spyOn(JWTHandler, 'decodeAccessToken').mockReturnValueOnce({
      payload: {
        sub: 'another_user_sub',
        origin_jti: 'string',
        event_id: 'string',
        token_use: 'string',
        scope: 'string',
        auth_time: 1,
        iss: 'string',
        exp: 1,
        iat: 1,
        jti: 'string',
        client_id: 'string',
        username: 'string',
      },
      signature: 'signature',
      header: {
        kid: 'kid',
        alg: 'alg',
      },
    });

    try {
      authorize(mockRequest as Request, mockResponse as Response, nextFunction);
    } catch (e) {
      expect(e).toBeTruthy();
      expect(e).toMatchObject({
        message: 'User sub invalid',
        statusCode: 401,
      });
    }
  });
});
