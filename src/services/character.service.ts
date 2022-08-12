import Character, { character } from "../models/character.model";

export async function getCharacters(): Promise<character[] | undefined> {
  const characters = await Character.findAll();
  return characters;
}

export async function createCharacter() {

}