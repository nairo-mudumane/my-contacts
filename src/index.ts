import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AppRoutes from "./routes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

AppRoutes(app);

app.listen(process.env.PORT, () =>
  console.log(`app running on: ${process.env.PORT}`)
);
