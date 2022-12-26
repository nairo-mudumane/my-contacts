import { IContact, INewContact } from "../@types";
import { formatContact, isEmpty } from "../resources";
import { UserModel } from "./user";

export class ContactModel {
  public async create(
    userId: string,
    payload: INewContact
  ): Promise<string | undefined> {
    const userModel = new UserModel();

    try {
      const user = await userModel.getById(userId);

      if (isEmpty(user)) throw new Error("user not found");

      const contacts = user!.contacts;
      const formatted = formatContact(payload) as IContact;
      contacts.push(formatted);

      await userModel.update(userId, { contacts });
      return;
    } catch (error) {
      throw error;
    }
  }
  constructor() {}
}
