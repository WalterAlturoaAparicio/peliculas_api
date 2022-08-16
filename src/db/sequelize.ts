import { Sequelize } from "sequelize-typescript";
import { Character } from "../models/character.model";
import { MovieCharacter } from "../models/movieCharacter.model";
import { Movie } from "../models/movie.model";
import { Genre } from "../models/genre.model";
import { GenreMovie } from "../models/genreMovie.model";

export const db = new Sequelize({
  dialect: "sqlite",
  storage: "./src/db/db.sqlite",
});

db.addModels([Character, Movie, MovieCharacter, Genre, GenreMovie])