import express from "express";
import { CharacterController } from "../controllers";

const router = express.Router();

router.get("/", CharacterController.getCharacters);
router.post("/", CharacterController.createCharacter);
router.put("/:id", CharacterController.editCharacter);
router.delete("/:id", CharacterController.deleteCharacter);
router.get("/detail/:id", CharacterController.getCharacterDetail);

export default router;
