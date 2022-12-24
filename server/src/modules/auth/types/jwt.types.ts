export type AccessTokenPayload = {
  type: 'access_token';
  userId: string;
  email: string;
};

export type RefreshTokenPayload = {
  type: 'refresh_token';
  userId: string;
  email: string;
};

export type TokenPayload = AccessTokenPayload | RefreshTokenPayload;

export type DecodedToken<T> = T & {
  // issued at
  iat: number;
  // expiration
  exp: number;
};
