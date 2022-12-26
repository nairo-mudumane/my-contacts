import { IContact, INewContact, IUser } from "../@types";
import { formatContact, isEmpty } from "../resources";
import { database } from "../services";
import { UserModel } from "./user";

export class ContactModel {
  private userRef = "users";
  private contactRef = "contacts";

  public async create(
    userId: string,
    payload: INewContact
  ): Promise<string | undefined> {
    try {
      const formatted = formatContact(payload) as IContact;
      await database
        .collection(this.userRef)
        .doc(userId)
        .collection(this.contactRef)
        .doc(formatted._id)
        .set(formatted);

      return formatted._id;
    } catch (error) {
      throw error;
    }
  }

  public async getAll(userId: string): Promise<IContact[]> {
    try {
      const contacts: IContact[] = [];

      await database
        .collection(this.userRef) // "users"
        .doc(userId)
        .collection(this.contactRef) // "contacts"
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            contacts.push(doc.data() as IContact);
          });
        });

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

      contact!.seen += 1;
      await userModel.update(userId, { contacts: [...contacts, contact] });

      return contact!;
    } catch (error) {
      throw error;
    }
  }

  constructor() {}
}
