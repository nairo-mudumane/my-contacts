import type { INewUser, INewUserFormatted } from "../@types";
import { getUid } from "./uuid";

export function formatUser({
  avatar,
  email,
  firstname,
  lastname,
}: INewUser): INewUserFormatted {
  const _id = getUid();

  const formatted: INewUserFormatted = {
    _id,
    avatar,
    email,
    firstname,
    lastname,
    contacts: [],
    fullname: `${firstname} ${lastname}`,
  };

  return formatted;
}
