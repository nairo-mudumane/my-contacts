import { model, Schema } from "mongoose";
import { IUser } from "../@types";

const userSchema = new Schema<IUser>(
  {
    contacts: [
      {
        ref: "contacts",
        type: Schema.Types.ObjectId,
      },
    ],
    avatar: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const userModel = model<IUser>("users", userSchema, "users");
