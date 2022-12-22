import type { Express } from "express";
import { ContactRoutes } from "./contact";
import { AuthRoutes } from "./user";

export default function AppRoutes(app: Express) {
  app.use("/contacts", ContactRoutes);
  app.use("/auth", AuthRoutes);
}
