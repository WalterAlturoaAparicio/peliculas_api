import { Request, Response } from "express";
import * as CharacterService from "../services/character.service";

export async function getCharacters(req: Request, res: Response) {
  try {
    const { body } = req;
    const characters = await CharacterService.getCharacters();
    console.log(body);
    res.status(200).json({ data: characters });
  } catch (error) {
    res.status(400).send(error);
  }
}
export async function createCharacter(req: Request, res: Response) {
  const { body } = req;
  res.send("En procesoo!!!!" + body);
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
export async function getCharacterDetail(req: Request, res: Response) {
  const { id } = req.params;
  res.send("En procesoo!!!!" + id);
}
