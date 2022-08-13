import express from "express";
import { CharacterController } from "../controllers";

const router = express.Router();

router.get("/:id?", CharacterController.getCharacter);
router.post("/", CharacterController.createCharacter);
router.put("/:id", CharacterController.editCharacter);
router.delete("/:id", CharacterController.deleteCharacter);

export default router;
