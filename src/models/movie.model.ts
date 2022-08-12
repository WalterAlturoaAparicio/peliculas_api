import { characterDetail } from "./character.model";
import { genre } from "./genre.model";
import { DataTypes } from 'sequelize'
import { db } from '../db/config';

export interface movieDetail {
  id: number;
  imagen: string;
  titulo: string;
  fecha_creacion?: string;
  calificacion?: number;
  personajes?: characterDetail[];
  genero?: genre[];
}

export type movie = Pick<movieDetail, "titulo" | "imagen" | "fecha_creacion">;


const Movie = db.define('Pelicula', {
  titulo: DataTypes.STRING,
  imagen: DataTypes.STRING,
  fecha_creacion: DataTypes.DATE,
  calificacion: DataTypes.NUMBER,
})
export default Movie;
