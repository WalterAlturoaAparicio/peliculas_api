import express from "express";
import { characterController } from "../controllers";

const router = express.Router();

router.get("/", characterController.getCharacter);
router.post("/", characterController.createCharacter);
router.put("/:id", characterController.editCharacter);
router.delete("/:id", characterController.deleteCharacter);
router.get("/detail/:id", characterController.getCharacterDetail);

export { router };
