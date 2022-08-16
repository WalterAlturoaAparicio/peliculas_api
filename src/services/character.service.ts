import {
  Character,
  characterInput,
  characterDetail,
  characterFilter,
  characterOutput,
  // characterOutput,
} from "../models/character.model";
import { errorService } from "./error.service";
import { Movie } from "../models/movie.model";
import { Op } from "sequelize";

function convertIntoCharacter(character: Character | null): characterDetail {
  if (character === null) throw new Error("No se encontro el personaje");
  const { id, nombre, edad, peso, historia, peliculas } = character;
  return { id, nombre, edad, peso, historia, peliculas };
}

function filtersCharacter(query?: characterFilter) {
  if (!query) return [];
  if (Object.values(query).length === 0) return [];

  const filters: characterFilter & { "$peliculas.id$"?: number } = {};

  if (query.nombre) filters.nombre = query.nombre;
  if (query.edad) filters.edad = query.edad;
  if (query.peso) filters.peso = query.peso;
  if (query.idPelicula) filters["$peliculas.id$"] = query.idPelicula;

  if (Object.values(filters).length === 0)
    throw new Error("Propiedad no reconocible");

  return filters;
}
export async function getCharacters(
  query?: characterFilter
): Promise<characterOutput[] | undefined> {
  let characters: characterOutput[] = [];
  const filters = filtersCharacter(query);
  if (Object.values(filters).length !== 0) {
    characters = await Character.findAll({
      where: {
        [Op.or]: [filters],
      },
      include: { model: Movie, as: "peliculas", attributes: ["id"], required:false },
      order: [["nombre", "ASC"]],
    });
  } else {
    characters = await Character.findAll({ order: [["nombre", "ASC"]] });
  }
  return characters.map(({ nombre, imagen }) => {
    return { nombre, imagen };
  });
}

export async function createCharacter(
  payload: characterInput
): Promise<characterDetail> {
  const { peliculasIds, ...all } = payload;

  const character = await Character.create(all);
  if (peliculasIds && peliculasIds.length !== 0)
    await character.$add("peliculas", peliculasIds);

  return convertIntoCharacter(character);
}

export async function getById(_id: number): Promise<characterDetail> {
  try {
    const character = await Character.findByPk(_id, {
      include: [
        {
          model: Movie,
          as: "peliculas",
          attributes: ["titulo", "imagen"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    return convertIntoCharacter(character);
  } catch (error) {
    throw errorService(error);
  }
}

export async function editCharacter(
  id: number,
  payload: characterInput
): Promise<characterDetail> {
  try {
    const character = await Character.findByPk(id);
    convertIntoCharacter(character);
    const { peliculasIds, ...all } = payload;
    const updatedCharacter = await (character as Character).update(all);

    if (peliculasIds && peliculasIds.length !== 0)
      await updatedCharacter.$set("peliculas", peliculasIds);

    return convertIntoCharacter(updatedCharacter);
  } catch (error) {
    throw errorService(error);
  }
}
export async function deleteCharacter(id: number): Promise<Boolean> {
  try {
    const character = await Character.findByPk(id);
    convertIntoCharacter(character);
    return !!Character.destroy({ where: { id } });
  } catch (error) {
    throw errorService(error);
  }
}
