import type { INewUser, INewUserFormatted } from "../@types";
import { generateTimestamps } from "./date";
import { getUid } from "./uuid";

export function formatUser({
  avatar,
  email,
  firstname,
  lastname,
}: INewUser): INewUserFormatted {
  const _id = getUid();
  const { createdAt, updatedAt } = generateTimestamps("create");

  const formatted: INewUserFormatted = {
    _id,
    avatar,
    email,
    firstname,
    createdAt,
    updatedAt,
    lastname,
    contacts: [],
    fullname: `${firstname} ${lastname}`,
  };

  return formatted;
}
