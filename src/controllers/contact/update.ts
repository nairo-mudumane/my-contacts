import type { Response } from "express";
import type { IAuthRequest, INewContactFormatted } from "../../@types";
import { ContactModel, UserModel } from "../../models";
import { removeFile } from "../../resources";

export async function update(request: IAuthRequest, response: Response) {
  const { user, params, body, file } = request;
  const payload = body as INewContactFormatted;

  const userModel = new UserModel();
  const contactModel = new ContactModel();

  try {
    let exists: unknown = await userModel.getById(user!._id);
    if (!exists)
      return response.status(404).json({ message: "user not found" });

    exists = await contactModel.getById(user!._id, params.id);
    if (!exists)
      return response.status(404).json({ message: "contact not found" });
    else if (
      payload.email &&
      (await contactModel.exists(user!._id, payload.email))
    )
      throw new Error("contact already exists");
  } catch (error: Error | any) {
    if (file) removeFile(file.path);
    return response.status(400).json({ message: error.message });
  }

  try {
    const updated = await contactModel.update(user!._id, params.id, payload);
    return response
      .status(200)
      .json({ message: "updated", count: 1, data: updated });
  } catch (error: Error | any) {
    if (file) removeFile(file.path);
    return response.status(500).json({ message: error.message });
  }
}
