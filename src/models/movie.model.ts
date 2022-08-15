import Character from "./character.model";
// import { genre } from "./genre.model";
import { DataTypes, Model } from "sequelize";
import { db } from "../db/config";

export interface movieDetail {
  id: number;
  titulo: string;
  imagen?: string;
  fecha_creacion?: string;
  calificacion?: number;
  personajes?: number[];
  genero?: number[];
}

export type movieInput = Pick<movieDetail, "titulo" | "imagen" | "fecha_creacion">;

class Movie extends Model<movieDetail, movieInput> implements movieDetail {
  id!: number;
  titulo!: string;
  imagen?: string;
  fecha_creacion?: string;
  calificacion?: number;
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
Character.belongsToMany(Movie, {through: "pelicula_personaje", as: "peliculas", foreignKey: "id_pelicula"})
Movie.belongsToMany(Character, {through: "pelicula_personaje", as: "personajes", foreignKey: "id_personaje"})
export default Movie;
