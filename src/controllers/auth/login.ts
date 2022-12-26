import type { Request, Response } from "express";
import type { IAuthCredentials } from "../../@types";
import { UserModel } from "../../models/user";
import { checkPayloadFields, isEmpty } from "../../resources";
import { generateLoginToken } from "../../resources/auth";

export async function login(request: Request, response: Response) {
  const payload = request.body as IAuthCredentials;

  try {
    checkPayloadFields(payload, ["email"]);
  } catch (error: Error | any) {
    return response.status(400).json({ message: error.message });
  }

  try {
    const userModel = new UserModel();
    const user = await userModel.getByEmail(payload.email!);

    if (isEmpty(user))
      return response.status(404).json({ message: "not found" });

    const token = generateLoginToken({ _id: user!._id });

    return response
      .status(200)
      .json({ message: "ok", count: 1, data: { ...user, token } });
  } catch (error: Error | any) {
    return response.status(500).json({ message: error.message });
  }
}
