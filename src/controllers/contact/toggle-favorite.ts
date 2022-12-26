import type { Response } from "express";
import type { IAuthRequest } from "../../@types";
import { ContactModel, UserModel } from "../../models";

export async function toggleFavorite(
  request: IAuthRequest,
  response: Response
) {
  const { user, params, body: payload } = request;

  try {
    const userModel = new UserModel();
    const contactModel = new ContactModel();

    const exists = userModel.getById(user!._id);
    if (!exists)
      return response.status(404).json({ message: "user not found" });

    const contact = await contactModel.getById(user!._id, params.id);
    if (!contact) return response.status(404).json({ message: "not found" });

    await contactModel.toggleFavorite(user!._id, params.id, payload.favorite);

    return response.status(200).json({ message: "updated", count: 1 });
  } catch (error: Error | any) {
    return response.status(500).json({ message: error.message });
  }
}
