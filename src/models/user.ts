import type { IContact, INewUser, IUser } from "../@types";
import { formatUser, isEmpty } from "../resources";
import { database } from "../services";

export class UserModel {
  private ref = "users";

  public async create(payload: INewUser): Promise<string> {
    try {
      const formatted = formatUser(payload);
      await database.collection(this.ref).doc(formatted._id).create(formatted);
      return formatted._id;
    } catch (error) {
      throw error;
    }
  }

  private async getAll(): Promise<IUser[]> {
    try {
      const users: IUser[] = [];
      await database
        .collection(this.ref)
        .get()
        .then((query) => {
          query.forEach((result) => {
            users.push(result.data() as IUser);
          });
        });

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
      const user = await this.getById(userId);

      if (isEmpty(user)) throw new Error("user not found");

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
