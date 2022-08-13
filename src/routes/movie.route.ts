import express from "express";
import { MovieController } from "../controllers";

const router = express.Router();

router.get("/:id?", MovieController.getMovie);
router.post("/", MovieController.createMovie);
router.put("/:id", MovieController.editMovie);
router.delete("/:id", MovieController.deleteMovie);

export default router;
