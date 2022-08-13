import Character, {
  characterInput,
  characterDetail,
} from "../models/character.model";

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
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error("Error desconocido");
  }
}
function convertIntoCharacter(character: Character | null): characterDetail {
  if (character === null) throw new Error("No se encontro el personaje");
  const { id, nombre, imagen, edad, peso, historia } = character;
  return { id, nombre, imagen, edad, peso, historia, peliculas: [] };
}
