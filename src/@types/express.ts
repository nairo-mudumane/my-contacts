import type { Request } from "express";

export type IDecodedUser = { _id: string };

export interface IAuthRequest extends Request {
  user?: IDecodedUser;
}
