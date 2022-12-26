import type { Request, Response } from "express";
import type { INewUser } from "../../@types";
import { UserModel } from "../../models/user";
import { checkPayloadFields } from "../../resources";

export async function create(request: Request, response: Response) {
  const payload = request.body as INewUser;
  const userModel = new UserModel();

  try {
    checkPayloadFields(payload, ["firstname", "lastname", "email"]);

    const exists = await userModel.exists(payload.email!);
    if (exists) throw new Error("contact already exists");
  } catch (error: Error | any) {
    return response.status(400).json({ message: error.message });
  }

  try {
    const _id = await userModel.create(payload);
    return response
      .status(201)
      .json({ message: "created", count: 1, data: { _id } });
  } catch (error: Error | any) {
    return response.status(500).json({ message: error.message });
  }
}
