import jwt from "jsonwebtoken";
import type { VerifyLoginTokenCallback } from "../@types";

export function generateLoginToken(data: { [key: string]: any }): string {
  const token = jwt.sign(data, process.env.SECRET_HAS!, {
    expiresIn: "24h",
  });

  return token;
}

export function verifyLoginToken(
  token: string,
  callback?: VerifyLoginTokenCallback
): void {
  try {
    jwt.verify(token, process.env.SECRET_HAS!, (err, decoded) => {
      if (err) throw err;

      if (callback) callback(err, decoded);
    });
  } catch (error: Error | any) {
    throw new Error(error.message);
  }
}
