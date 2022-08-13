import Character, { characterDetail } from "./character.model";
import { genre } from "./genre.model";
import { DataTypes, Model, Optional } from "sequelize";
import { db } from "../db/config";

export interface movieDetail {
  id: number;
  titulo: string;
  imagen?: string;
  fecha_creacion?: string;
  calificacion?: number;
  personajes?: characterDetail[];
  genero?: genre[];
}

export type movie = Pick<movieDetail, "titulo" | "imagen" | "fecha_creacion">;

export interface movieOutput extends Required<movieDetail> {}
export interface movieInput
  extends Optional<movie, "imagen" | "fecha_creacion"> {}

class Movie extends Model<movieDetail, movieInput> implements movieDetail {
  id!: number;
  titulo!: string;
  imagen?: string;
  fecha_creacion?: string;
  calificacion?: number;
  personajes?: characterDetail[];
  genero?: genre[];
}
Movie.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imagen: DataTypes.STRING,
  fecha_creacion: DataTypes.DATE,
  calificacion: DataTypes.NUMBER,
},
{
  timestamps: false,
  sequelize: db,
  tableName: 'pelicula',
  modelName: 'pelicula'
})
Character.belongsToMany(Movie, {through: "pelicula_personaje"})
Movie.belongsToMany(Character, {through: "pelicula_personaje"})
export default Movie;
