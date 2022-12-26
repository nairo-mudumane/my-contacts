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

      const snapshot = await database
        .collection(this.userRef)
        .doc(userId)
        .collection(this.contactRef)
        .get();

      snapshot.forEach((doc) => contacts.push(doc.data() as IContact));

      return contacts;
    } catch (error) {
      throw error;
    }
  }

  public async getById(
    userId: string,
    contactId: string
  ): Promise<IContact | undefined> {
    try {
      const contact = (
        await database
          .collection(this.userRef)
          .doc(userId)
          .collection(this.contactRef)
          .doc(contactId)
          .get()
      ).data() as IContact;

      if (contact) {
        let { seen } = contact;
        seen += 1;

        await database
          .collection(this.userRef)
          .doc(userId)
          .collection(this.contactRef)
          .doc(contactId)
          .update({ seen });
      }

      return contact;
    } catch (error) {
      throw error;
    }
  }

  public async exists(userId: string, email: string): Promise<boolean> {
    try {
      let exists = false;
      const contacts = await this.getAll(userId);

      contacts.forEach((contact) => {
        if (contact.email === email) exists = true;
      });

      return exists;
    } catch (error) {
      throw error;
    }
  }

  public async toggleFavorite(
    userId: string,
    contactId: string,
    favorite: boolean
  ): Promise<void> {
    await database
      .collection(this.userRef)
      .doc(userId)
      .collection(this.contactRef)
      .doc(contactId)
      .update({ favorite });
  }

  public async getFavorites(userId: string): Promise<IContact[]> {
    try {
      const contacts: IContact[] = [];

      await database
        .collection(this.userRef)
        .doc(userId)
        .collection(this.contactRef)
        .where("favorite", "==", true)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => contacts.push(doc.data() as IContact));
        });

      return contacts;
    } catch (error) {
      throw error;
    }
  }

  constructor() {}
}
