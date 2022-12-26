import type { Response } from "express";
import type { IAuthRequest } from "../../@types";
import { ContactModel, UserModel } from "../../models";

export async function getFavorites(request: IAuthRequest, response: Response) {
  const { user } = request;

  try {
    const userModel = new UserModel();
    const contactModel = new ContactModel();

    const exists = userModel.getById(user!._id);
    if (!exists)
      return response.status(404).json({ message: "user not found" });

    const contacts = await contactModel.getFavorites(user!._id);
    const count = contacts.length;

    return response.status(200).json({ message: "ok", count, data: contacts });
  } catch (error: Error | any) {
    return response.status(500).json({ message: error.message });
  }
}
