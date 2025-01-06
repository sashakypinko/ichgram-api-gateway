export interface JwtPayload {
  userId: string;
  userScopes: string[];
  jti: string;
}