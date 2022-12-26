import type { Request, Response } from "express";
import { UserModel } from "../../models/user";
import { isEmpty } from "../../resources";

export async function getProfile(request: Request, response: Response) {
  const params = request.params;

  try {
    const userModel = new UserModel();
    const user = await userModel.getById(params.id);

    if (isEmpty(user))
      return response.status(404).json({ message: "not found" });

    return response.status(200).json({ message: "ok", count: 1, data: user });
  } catch (error: Error | any) {
    return response.status(500).json({ message: error.message });
  }
}
