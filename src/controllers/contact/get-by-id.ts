import type { Response } from "express";
import type { IAuthRequest } from "../../@types";
import { ContactModel } from "../../models";

export async function getById(request: IAuthRequest, response: Response) {
  const { user, params } = request;

  try {
    const contactModel = new ContactModel();

    const contact = await contactModel.getById(user!._id, params.id);

    return response
      .status(200)
      .json({ message: "ok", count: 1, data: contact });
  } catch (error: Error | any) {
    return response.status(500).json({ message: error.message });
  }
}
