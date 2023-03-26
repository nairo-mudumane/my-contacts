import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const uri = process.env.DB_URI;
const dbName = process.env.DB_NAME;
const env = process.env.NODE_ENV;

export async function connectToDataBase(): Promise<void> {
  console.log("connecting to database...");

  try {
    if (!uri) throw new Error(`No database url provided`);

    mongoose.set("debug", env === "DEVELOPMENT");
    mongoose.set("strict", true);

    await mongoose.connect(uri, {
      dbName,
      retryReads: true,
      retryWrites: true,
      connectTimeoutMS: 12000,
    });
  } catch (error) {
    console.error(error);
    throw new Error((error as Error).message);
  }

  console.log("connected to database");
}
