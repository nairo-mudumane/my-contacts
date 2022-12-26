import { Router } from "express";
import * as controller from "../controllers/auth";

const router = Router();

router.post("/new", controller.create);
router.get("/:id", controller.getProfile);

export { router as AuthRoutes };
