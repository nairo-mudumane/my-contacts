import type { IContact, INewUser, IUser } from "../@types";
import { formatUser, generateLoginToken, isEmpty } from "../resources";
import { database } from "../services";

export class UserModel {
  private ref = "users";

  public async create(payload: INewUser): Promise<IUser> {
    try {
      const formatted = formatUser(payload);
      const token = generateLoginToken({ _id: formatted._id });
      await database.collection(this.ref).doc(formatted._id).set(formatted);

      const created: IUser = {
        token,
        ...formatted,
        _id: formatted._id,
        email: formatted.email!,
        firstname: formatted.firstname!,
        lastname: formatted.lastname!,
        fullname: formatted.fullname,
        avatar: formatted.avatar!,
        contacts: [],
      };
      return created;
    } catch (error) {
      throw error;
    }
  }

  private async getAll(): Promise<IUser[]> {
    try {
      const users: IUser[] = [];
      const snapshot = await database.collection(this.ref).get();
      snapshot.forEach((doc) => users.push(doc.data() as IUser));

      return users;
    } catch (error) {
      throw error;
    }
  }

  public async exists(email: string): Promise<boolean> {
    try {
      const users = await this.getAll();
      let exists = false;

      users.forEach((user) => {
        if (user.email === email) exists = true;
      });

      return exists;
    } catch (error) {
      throw error;
    }
  }

  public async getById(id: string): Promise<IUser | undefined> {
    try {
      const user = await database
        .collection(this.ref)
        .doc(id)
        .get()
        .then((snapshot) => {
          const result = snapshot.data();
          return result as IUser | undefined;
        });

      return user;
    } catch (error) {
      throw error;
    }
  }

  public async getByEmail(email: string): Promise<IUser | undefined> {
    try {
      const users = await this.getAll();
      if (users.length <= 0) return;

      let user: IUser | undefined;
      users.forEach((_user) => {
        if (_user.email === email) user = _user;
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  public async update(
    userId: string,
    payload: { [key: string]: any }
  ): Promise<void> {
    try {
      await database
        .collection(this.ref)
        .doc(userId)
        .update({ ...payload });
    } catch (error) {
      throw error;
    }
  }

  constructor() {}
}
