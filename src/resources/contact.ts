import type { INewContact, INewContactFormatted } from "../@types";
import { getUid } from "./uuid";

export function formatContact({
  email,
  firstname,
  lastname,
  phone,
}: INewContact): INewContactFormatted {
  const _id = getUid();
  const formatted: INewContactFormatted = {
    _id,
    email,
    phone,
    firstname,
    lastname,
    fullname: `${firstname} ${lastname}`,
  };

  return formatted;
}
