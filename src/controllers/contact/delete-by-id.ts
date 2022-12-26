import type { Response } from "express";
import type { IAuthRequest } from "../../@types";
import { ContactModel, UserModel } from "../../models";

export async function deleteById(request: IAuthRequest, response: Response) {
  const { user, params } = request;
  const userModel = new UserModel();
  const contactModel = new ContactModel();

  try {
    let exists: unknown = await userModel.getById(user!._id);
    if (!exists)
      return response.status(404).json({ message: "user not found" });

    exists = await contactModel.getById(user!._id, params.id);
    if (!exists)
      return response.status(404).json({ message: "contact not found" });
  } catch (error: Error | any) {
    return response.status(400).json({ message: error.message });
  }

  try {
    await contactModel.deleteById(user!._id, params.id);
    return response.status(200).json({ message: "deleted", count: 1 });
  } catch (error: Error | any) {
    return response.status(500).json({ message: error.message });
  }
}
