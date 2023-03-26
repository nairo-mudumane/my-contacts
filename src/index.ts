import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AppRoutes from "./routes";
import { connectToDataBase } from "./services";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// AppRoutes(app);

connectToDataBase().then(() =>
  app.listen(process.env.PORT, () =>
    console.log(`app running on: ${process.env.PORT}`)
  )
);
