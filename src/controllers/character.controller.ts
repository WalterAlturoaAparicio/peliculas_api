import { Request, Response } from "express";
import * as CharacterService from "../services/character.service";

export async function getCharacter(req: Request, res: Response) {
  const { id } = req.params;
  try {
    if (!id) {
      const characters = await CharacterService.getCharacters();
      res.status(200).json({ data: characters });
      return;
    }
    const character = await CharacterService.getById(+id);
    res.status(200).json({ data: character });
  } catch (error) {
    if (error instanceof Error) {
      const { message } = error;
      res.status(400).json({ message });
      return
    }
    res.status(400).json({message: "Error desconocido"});
  }
}
export async function createCharacter(req: Request, res: Response) {
  const { body } = req;
  try {
    const character = await CharacterService.createCharacter(body);
    res.status(201).json({data: character});
  } catch (error) {
    res.status(400).json({ Error: error });
  }
}
export async function editCharacter(req: Request, res: Response) {
  const { body } = req;
  const { id } = req.params;

  res.send("En procesoo!!!!" + body + id);
}
export async function deleteCharacter(req: Request, res: Response) {
  const { id } = req.params;
  res.send("En procesoo!!!!" + id);
}
