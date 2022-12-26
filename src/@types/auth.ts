import type { JwtPayload, VerifyErrors } from "jsonwebtoken";

export interface IAuthCredentials {
  email?: string;
}

export type VerifyLoginTokenCallback = (
  error: VerifyErrors | null,
  decoded: JwtPayload | string | undefined
) => void;
