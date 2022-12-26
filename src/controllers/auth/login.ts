import fetch from "node-fetch";
import type { Request, Response } from "express";
import type { IAuthCredentials, IGoogleUser } from "../../@types";
import { UserModel } from "../../models/user";
import { checkPayloadFields, isEmpty } from "../../resources";
import { generateLoginToken } from "../../resources/auth";

export async function login(request: Request, response: Response) {
  const payload = request.body as IAuthCredentials;

  try {
    checkPayloadFields(payload, ["token"]);
  } catch (error: Error | any) {
    return response.status(400).json({ message: error.message });
  }

  try {
    const googleOauth2Url = "https://www.googleapis.com/oauth2/v2/userinfo";
    const googleInfo = await fetch(googleOauth2Url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${payload.token}`,
      },
    }).then(async (res) => {
      if (res.ok) return (await res.json()) as IGoogleUser;
      return null;
    });

    if (!googleInfo)
      return response.status(400).json({ message: "user not found" });

    const userModel = new UserModel();
    let user = await userModel.getByEmail(googleInfo.email);

    if (isEmpty(user)) {
      user = await userModel.create({
        avatar: googleInfo.picture,
        email: googleInfo.email,
        firstname: googleInfo.given_name,
        lastname: googleInfo.family_name,
      });
    }

    const token = user!.token
      ? user!.token
      : generateLoginToken({ _id: user!._id });

    return response
      .status(200)
      .json({ message: "ok", count: 1, data: { ...user, token } });
  } catch (error: Error | any) {
    console.error(error);
    return response.status(500).json({ message: error.message });
  }
}
