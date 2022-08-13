import { Request, Response } from "express";
import * as CharacterService from "../services/character.service";
import { errorController } from "./error.controller";

export async function getCharacter(req: Request, res: Response) {
  const { id } = req.params;
  try {
    if (!id) {
      const characters = await CharacterService.getCharacters();
      return res.status(200).json({ data: characters });
    }
    const character = await CharacterService.getById(+id);
    return res.status(200).json({ data: character });
  } catch (error) {
    return errorController(error, req, res);
  }
}
export async function createCharacter(req: Request, res: Response) {
  const { body } = req;
  try {
    const character = await CharacterService.createCharacter(body);
    return res.status(201).json({ data: character });
  } catch (error) {
    return errorController(error, req, res);
  }
}
export async function editCharacter(req: Request, res: Response) {
  const { body } = req;
  const { id } = req.params;
  try {
    const character = await CharacterService.editCharacter(+id, body);

    return res.status(202).json({data: character});
  } catch (error) {
    return errorController(error, req, res);
  }
}
export async function deleteCharacter(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const success = await CharacterService.deleteCharacter(+id);
    return res.status(202).json({success});
  } catch (error) {
    return errorController(error, req, res);
  }
  
}
