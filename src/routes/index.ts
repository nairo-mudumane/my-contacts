import type { Express } from "express";
import { ContactRoutes } from "./contact";

export default function AppRoutes(app: Express) {
  app.use("/contacts", ContactRoutes);
}
