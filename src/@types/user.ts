import type { IContact } from "./contact";
import type { ITimeStamps } from "./data";

export interface IUser extends ITimeStamps {
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  avatar: string;
  contacts: IContact[];
}

export interface INewUser {
  firstname?: string;
  lastname?: string;
  email?: string;
  avatar?: string;
  token?: string;
}

export interface INewUserFormatted extends INewUser {
  fullname: string;
  contacts: IContact[];
  avatar?: string;
}
