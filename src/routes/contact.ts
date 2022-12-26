import { Router } from "express";
import * as controller from "../controllers/contact";
import { authUser, localUpload } from "../middlewares";

const router = Router();
router.use(authUser);

router.post("/", localUpload.single("avatar"), controller.create);
router.get("/", controller.getAll);
router.get("/favorites", controller.getFavorites);
router.get("/:id", controller.getById);
router.patch("/:id", controller.toggleFavorite);
router.put("/:id", localUpload.single("avatar"), controller.update);

export { router as ContactRoutes };
