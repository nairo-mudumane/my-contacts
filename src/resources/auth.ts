import jwt from "jsonwebtoken";

export function generateLoginToken(data: { [key: string]: any }): string {
  const token = jwt.sign(data, process.env.SECRET_HAS!, {
    expiresIn: "24h",
  });

  return token;
}
