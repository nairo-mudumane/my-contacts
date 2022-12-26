import type { INewContact, INewContactFormatted } from "../@types";
import { getUid } from "./uuid";

export function formatContact({
  email,
  firstname,
  lastname,
  phone,
}: INewContact): INewContactFormatted {
  const _id = getUid();
  const favorite = false;
  const seen = 0;

  const formatted: INewContactFormatted = {
    _id,
    favorite,
    seen,
    email,
    phone,
    firstname,
    lastname,
    fullname: `${firstname} ${lastname}`,
  };

  return formatted;
}
