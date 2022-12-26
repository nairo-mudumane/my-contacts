import { Router } from "express";
import * as controller from "../controllers/contact";
import { authUser, localUpload } from "../middlewares";

const router = Router();
router.use(authUser);

router.post("/", localUpload.single("avatar"), controller.create);

export { router as ContactRoutes };
