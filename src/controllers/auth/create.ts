import type { Request, Response } from "express";
import type { INewUser, IUser } from "../../@types";
import { checkPayloadFields, formatUser, isEmpty } from "../../resources";
import { firestore, firestoreAuth } from "../../services";

export async function create(request: Request, response: Response) {
  let REF = "users";
  const payload = request.body as INewUser;

  try {
    checkPayloadFields(payload, ["firstname", "lastname", "email"]);

    const exists = await firestoreAuth.getUserByEmail(payload.email!);
    if (!isEmpty(exists)) throw new Error("email already exists");
  } catch (error: Error | any) {
    console.error(error);
    return response.status(400).json({ message: error.message });
  }

  try {
    const formattedUser = formatUser(payload);

    return response.json({ formattedUser });
  } catch (error: Error | any) {
    return response.status(500).json({ message: error.message });
  }
}
