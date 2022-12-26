import type { IContact } from "./contact";
import type { ITimeStamps } from "./data";

export interface IUser extends ITimeStamps {
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  contacts: IContact[];
  avatar?: string;
  token?: string;
}

export interface INewUser {
  firstname?: string;
  lastname?: string;
  email?: string;
  avatar?: string;
}

export interface INewUserFormatted extends INewUser, ITimeStamps {
  _id: string;
  fullname: string;
  contacts: IContact[];
}
