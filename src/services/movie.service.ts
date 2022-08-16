import {
  Movie,
  movieInput,
  movieDetail,
  movieOutput,
  movieFilter,
} from "../models/movie.model";
import { errorService } from "./error.service";
import { Genre } from "../models/genre.model";
import { Character } from "../models/character.model";
import { Op } from "sequelize";

function filtersMovies(query?: movieFilter) {
  if (!query) return [];
  if (Object.values(query).length === 0) return [];

  const filters: movieFilter & { "$genero.id$"?: number } = {};

  if (query.titulo) filters.titulo = query.titulo;
  if (query.idGenero) filters["$genero.id$"] = query.idGenero;

  if (Object.values(filters).length === 0)
    throw new Error("Propiedad no reconocible");

  return filters;
}
export async function getMovies(
  query?: movieFilter
): Promise<movieOutput[] | undefined> {
  let movies: movieOutput[] = [];
  const filters = filtersMovies(query);
  if (Object.values(filters).length !== 0) {
    movies = await Movie.findAll({
      where: {
        [Op.or]: [filters],
      },
      order: [["fecha_creacion", query?.order ? query.order : "DESC"]],
      include: [
        { model: Genre, attributes: ["id"] },
        { model: Character, as: "personajes", attributes: ["id"] },
      ],
    });
  } else {
    movies = await Movie.findAll({ order: [["fecha_creacion", "DESC"]] });
  }

  return movies.map(({ titulo, imagen, fecha_creacion }) => {
    return { titulo, imagen, fecha_creacion };
  });
}

export async function createMovie(payload: movieInput): Promise<movieDetail> {
  const { generosIds, ...all } = payload;

  const movie = await Movie.create(all);
  if (generosIds) await movie.$add("genero", generosIds);
  return convertIntoMovie(movie);
}

export async function getById(_id: number): Promise<movieDetail> {
  try {
    const movie = await Movie.findByPk(_id, {
      include: [
        {
          model: Character,
          as: "personajes",
          attributes: ["nombre", "imagen"],
          through: {
            attributes: [],
          },
        },
        {
          model: Genre,
          attributes: ["nombre"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    return convertIntoMovie(movie);
  } catch (error) {
    throw errorService(error);
  }
}
function convertIntoMovie(movie: Movie | null): movieDetail {
  if (movie === null) throw new Error("No se encontro la película o serie");
  const {
    id,
    titulo,
    imagen,
    fecha_creacion,
    calificacion,
    personajes,
    genero,
  } = movie;
  return {
    id,
    titulo,
    imagen,
    fecha_creacion,
    calificacion,
    personajes,
    genero,
  };
}

export async function editMovie(
  id: number,
  payload: movieInput
): Promise<movieDetail> {
  try {
    const movie = await Movie.findByPk(id);
    convertIntoMovie(movie);
    const { generosIds, personajesIds, ...all } = payload;
    const updatedMovie = await (movie as Movie).update(all);

    if (generosIds && generosIds.length !== 0)
      await updatedMovie.$set("genero", generosIds);

    if (personajesIds && personajesIds.length !== 0)
      await updatedMovie.$set("personajes", personajesIds);

    return convertIntoMovie(updatedMovie);
  } catch (error) {
    throw errorService(error);
  }
}
export async function deleteMovie(id: number): Promise<Boolean> {
  try {
    const movie = await Movie.findByPk(id);
    convertIntoMovie(movie);
    return !!Movie.destroy({ where: { id } });
  } catch (error) {
    throw errorService(error);
  }
}
