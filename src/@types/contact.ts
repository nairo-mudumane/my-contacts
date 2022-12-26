import type { ITimeStamps } from "./data";

export interface IContact extends ITimeStamps {
  _id: string;
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  phone: number;
  favorite: boolean;
  seen: number;
  avatar?: string;
}

export interface INewContact {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: number;
  avatar?: string;
}

export interface INewContactFormatted extends INewContact {
  fullname: string;
  _id: string;
  favorite: boolean;
  seen: number;
}
