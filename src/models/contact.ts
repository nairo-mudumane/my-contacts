import { IContact, INewContact, IUser } from "../@types";
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

  public async getAll(userId: string): Promise<IContact[]> {
    try {
      const userModel = new UserModel();

      const user = await userModel.getById(userId);
      if (isEmpty(user)) throw new Error("user not found");

      const { contacts } = user as IUser;
      return contacts;
    } catch (error) {
      throw error;
    }
  }

  public async getById(userId: string, contactId: string): Promise<IContact> {
    try {
      const userModel = new UserModel();

      const user = await userModel.getById(userId);
      if (isEmpty(user)) throw new Error("user not found");

      const { contacts } = user as IUser;

      let contact = contacts.find((item) => item._id === contactId);

      if (isEmpty(contact)) throw new Error("contact not found");

      return contact!;
    } catch (error) {
      throw error;
    }
  }

  constructor() {}
}
