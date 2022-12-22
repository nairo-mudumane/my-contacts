import { Router } from "express";
import * as controller from "../controllers/auth";

const router = Router();

router.post("/new", controller.create);

export { router as AuthRoutes };
