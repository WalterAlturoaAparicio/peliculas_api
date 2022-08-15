import Movie, { movieInput, movieDetail } from "../models/movie.model";
import { errorService } from "./error.service";

export async function getMovies(): Promise<movieInput[] | undefined> {
  const movies = await Movie.findAll();
  return movies.map(({ titulo, imagen }) => {
    return { titulo, imagen };
  });
}

export async function getFilterMovies(
  id: number[] | undefined
): Promise<Movie[] | undefined> {
  return Movie.findAll({ where: { id } });
}

export async function createMovie(payload: movieInput): Promise<movieDetail> {
  const movie = await Movie.create(payload);
  return convertIntoMovie(movie);
}

export async function getById(_id: number): Promise<movieDetail> {
  try {
    const movie = await Movie.findByPk(_id);
    return convertIntoMovie(movie);
  } catch (error) {
    throw errorService(error);
  }
}
function convertIntoMovie(movie: Movie | null): movieDetail {
  if (movie === null) throw new Error("No se encontro la película o serie");
  const { id, titulo, imagen, fecha_creacion, calificacion } = movie;
  return {
    id,
    titulo,
    imagen,
    fecha_creacion,
    calificacion,
    personajes: [],
    genero: [],
  };
}

export async function editMovie(
  id: number,
  payload: movieInput
): Promise<movieDetail> {
  try {
    const movie = await Movie.findByPk(id);
    convertIntoMovie(movie);
    const updatedMovie = await (movie as Movie).update(payload);
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
