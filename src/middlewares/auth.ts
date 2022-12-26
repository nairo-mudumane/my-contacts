import type { Response, NextFunction } from "express";
import type { IAuthRequest, IDecodedUser } from "../@types";
import { verifyLoginToken } from "../resources";

export function authUser(
  request: IAuthRequest,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader)
    return response
      .status(401)
      .json({ message: "unauthorized: no token provided" });

  const parts = authHeader.split(" ");
  if (parts.length !== 2)
    return response
      .status(401)
      .json({ message: "unauthorized: invalid token structure" });

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme))
    return response
      .status(401)
      .json({ message: "unauthorized: invalid token structure" });

  try {
    verifyLoginToken(token, (err, decoded) => {
      if (err) throw err;

      const { _id } = decoded as IDecodedUser;
      request["user"] = { _id };
    });
    return next();
  } catch (error: Error | any) {
    return response
      .status(498)
      .json({ message: `unauthorized: ${error.message}` });
  }
}
