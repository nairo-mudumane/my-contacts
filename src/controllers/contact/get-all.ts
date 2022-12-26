import type { Response } from "express";
import type { IAuthRequest } from "../../@types";
import { ContactModel } from "../../models";

export async function getAll(request: IAuthRequest, response: Response) {
  const { user: decodedUser } = request;

  try {
    const contactModel = new ContactModel();

    const contacts = await contactModel.getAll(decodedUser!._id);
    const count = contacts.length;

    return response.status(200).json({ message: "ok", count, data: contacts });
  } catch (error: Error | any) {
    return response.status(500).json({ message: error.message });
  }
}
