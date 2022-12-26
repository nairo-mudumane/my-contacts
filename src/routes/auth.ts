import { Router } from "express";
import * as controller from "../controllers/auth";
import { authUser } from "../middlewares";

const router = Router();

router.post("/", controller.login);
// router.post("/new", controller.create);
// router.post("/login", controller.login);

router.use(authUser);
router.get("/profile", controller.getProfile);

export { router as AuthRoutes };
