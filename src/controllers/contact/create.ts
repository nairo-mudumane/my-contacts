import type { Response } from "express";
import type { IAuthRequest, IContact, INewContact, IUser } from "../../@types";
import { ContactModel } from "../../models";
import { UserModel } from "../../models/user";
import { checkPayloadFields, isEmpty, removeFile } from "../../resources";
import { CloudUpload } from "../../services";

export async function create(request: IAuthRequest, response: Response) {
  const { user: decodedUser } = request;
  const payload = request.body as INewContact;
  const file = request.file;
  let avatar: string | undefined;
  let user: IUser | undefined;

  try {
    checkPayloadFields(payload, ["firstname", "lastname", "email", "phone"]);

    const userModel = new UserModel();
    user = await userModel.getById(decodedUser!._id);
    if (isEmpty(user))
      return response.status(404).json({ message: "user not found" });

    const contacts = user!.contacts as IContact[];
    contacts.forEach((contact) => {
      if (contact.email === payload.email || contact.phone === payload.phone)
        throw new Error("contact already exists");
    });
  } catch (error: Error | any) {
    if (file) await removeFile(file.path);
    return response.status(400).json({ message: error.message });
  }

  try {
    if (!isEmpty(file)) {
      const upload = new CloudUpload();
      avatar = await upload.single({
        destination: "users-contacts",
        filename: file!.filename,
        filepath: file!.path,
      });
    }

    const contactModel = new ContactModel();

    const created = await contactModel.create(decodedUser!._id, {
      ...payload,
      avatar,
    });

    return response
      .status(201)
      .json({ message: "created", count: 1, data: { _id: created } });
  } catch (error: Error | any) {
    if (file) await removeFile(file.path);
    return response.status(500).json({ message: error.message });
  }
}
