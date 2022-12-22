import type { ITimeStamps } from "./data";

export interface IContact extends ITimeStamps {
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  phone: number;
  favorite: boolean;
  seen: number;
  avatar?: string;
}
