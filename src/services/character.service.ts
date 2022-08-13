import Character, {
  characterInput,
  characterDetail,
} from "../models/character.model";
import { errorService } from "./error.service";

export async function getCharacters(): Promise<characterInput[] | undefined> {
  const characters = await Character.findAll();
  return characters.map(({ nombre, imagen }) => {
    return { nombre, imagen };
  });
}

export async function createCharacter(
  payload: characterInput
): Promise<characterDetail> {
  const character = await Character.create(payload);
  return convertIntoCharacter(character);
}

export async function getById(_id: number): Promise<characterDetail> {
  try {
    const character = await Character.findByPk(_id);
    return convertIntoCharacter(character);
  } catch (error) {
    throw errorService(error);
  }
}
function convertIntoCharacter(character: Character | null): characterDetail {
  if (character === null) throw new Error("No se encontro el personaje");
  const { id, nombre, imagen, edad, peso, historia } = character;
  return { id, nombre, imagen, edad, peso, historia, peliculas: [] };
}

export async function editCharacter(id: number, payload: characterInput): Promise<characterDetail>{
  try {
    const character = await Character.findByPk(id);
    convertIntoCharacter(character);
    const updatedCharacter = await (character as Character).update(payload);
    return convertIntoCharacter(updatedCharacter);
  } catch (error) {
    throw errorService(error);
  }
}
export async function deleteCharacter(id: number): Promise<Boolean> {
  try {
    const character = await Character.findByPk(id);
    convertIntoCharacter(character);
    return !!Character.destroy({where: {id}});
  } catch (error) {
    throw errorService(error);
  }
}
