import type { INewUser, IUser } from "../@types";
import { formatUser } from "../resources";
import { database } from "../services";

export class UserModel {
  private ref = "users";

  async create(payload: INewUser): Promise<string> {
    try {
      const formatted = formatUser(payload);
      await database.collection(this.ref).doc(formatted._id).create(formatted);
      return formatted._id;
    } catch (error: Error | any) {
      throw error;
    }
  }

  async getAll(): Promise<IUser[]> {
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
  }

  async exists(email: string): Promise<boolean> {
    const users = await this.getAll();
    let exists = false;

    users.forEach((user) => {
      if (user.email === email) exists = true;
    });

    return exists;
  }

  async getById(id: string): Promise<IUser | undefined> {
    const user = await database
      .collection(this.ref)
      .doc(id)
      .get()
      .then((snapshot) => {
        const result = snapshot.data();
        return result as IUser | undefined;
      });
    return user;
  }

  async getByEmail(email: string): Promise<IUser | undefined> {
    const users = await this.getAll();
    if (users.length <= 0) return;

    let user: IUser | undefined;
    users.forEach((_user) => {
      if (_user.email === email) user = _user;
    });

    return user;
  }

  constructor() {}
}
