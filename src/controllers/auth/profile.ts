import type { Response } from "express";
import type { IAuthRequest } from "../../@types";
import { UserModel } from "../../models/user";
import { isEmpty } from "../../resources";

export async function getProfile(request: IAuthRequest, response: Response) {
  const { user: decodedUser } = request;

  try {
    const userModel = new UserModel();

    const user = await userModel.getById(decodedUser!._id);

    if (isEmpty(user))
      return response.status(404).json({ message: "not found" });

    return response.status(200).json({ message: "ok", count: 1, data: user });
  } catch (error: Error | any) {
    return response.status(400).json({ message: error.message });
  }
}
