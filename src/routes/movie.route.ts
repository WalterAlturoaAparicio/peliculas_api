import express from "express";
import { MovieController } from "../controllers/movie.controller";

const router = express.Router();

router.get("/", MovieController.getMovie);
router.get("/:id", MovieController.getMovieDetail);
router.post("/", MovieController.createMovie);
router.put("/:id", MovieController.editMovie);
router.delete("/:id", MovieController.deleteMovie);

export default router;