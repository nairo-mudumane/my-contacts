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
  _id: string;
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
}

export interface IGoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}
