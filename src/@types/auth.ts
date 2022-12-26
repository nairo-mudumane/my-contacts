import type { JwtPayload, VerifyErrors } from "jsonwebtoken";

export interface IAuthCredentials {
  token?: string;
}

export type VerifyLoginTokenCallback = (
  error: VerifyErrors | null,
  decoded: JwtPayload | string | undefined
) => void;
