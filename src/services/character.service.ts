import Character, {
  characterInput,
  characterDetail,
  characterFilter,
} from "../models/character.model";
import { errorService } from "./error.service";
import Movie from "../models/movie.model";
import { Op } from "sequelize";
import { MovieService } from ".";

export async function getCharacters(
  query?: characterFilter
): Promise<characterInput[] | undefined> {
  if (query) {
    const characters = await Character.findAll({
      where: {
        [Op.or]: [
          query.nombre ? { nombre: query.nombre } : {},
          query.edad ? { edad: query.edad } : {},
          query.peso ? { peso: query.peso } : {},
          query.idPelicula ? { "$peliculas.id$": query.idPelicula } : {},
        ],
      },
      include: [
        {
          model: Movie,
          as: "peliculas",
          attributes: ["id", "titulo", "imagen"],
          through: {
            attributes: [],
          },
          required: false,
        },
      ],
    });
    return characters.map(({ nombre, imagen, peliculas }) => {
      return { nombre, imagen, peliculas };
    });
  } else {
    const characters = await Character.findAll();
    return characters.map(({ nombre, imagen }) => {
      return { nombre, imagen };
    });
  }
}

export async function createCharacter(
  payload: characterInput
): Promise<characterDetail> {
  const { peliculasIds, ...all } = payload;
  if (peliculasIds) {
    const pelis = await MovieService.getFilterMovies(payload.peliculasIds);
    const character = await Character.create({...all});
    character.peliculas = pelis;
    await character.save();
    return convertIntoCharacter(character);
  }
  const character = await Character.create(payload);
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
function convertIntoCharacter(character: Character | null): characterDetail {
  if (character === null) throw new Error("No se encontro el personaje");
  const { id, nombre, imagen, edad, peso, historia, peliculas } = character;
  return { id, nombre, imagen, edad, peso, historia, peliculas };
}

export async function editCharacter(
  id: number,
  payload: characterInput
): Promise<characterDetail> {
  try {
    const character = await Character.findByPk(id);
    convertIntoCharacter(character);
    const { peliculasIds, ...all } = payload;
    const updatedCharacter = await (character as Character).update({...all});
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
