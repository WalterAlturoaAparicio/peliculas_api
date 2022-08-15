import { DataTypes, Model } from "sequelize";
import { db } from "../db/config";
// import { movieDetail } from "./movie.model";
import Movie from "./movie.model";

export interface characterDetail {
  id: number;
  nombre: string;
  imagen?: string;
  edad?: number;
  peso?: number;
  historia?: string;
  peliculasIds?: number[];
  peliculas?: Movie[];
}
export type characterInput = Omit<characterDetail, "id">;
export type characterFilter = Pick<characterDetail, "edad" | "peso"> & {
  nombre?: string;
  idPelicula?: number;
};

class Character
  extends Model<characterDetail, characterInput>
  implements characterDetail
{
  id!: number;
  nombre!: string;
  imagen?: string;
  edad?: number;
  peso?: number;
  historia?: string;
  peliculas?: Movie[];
}
Character.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    edad: DataTypes.NUMBER,
    peso: DataTypes.NUMBER,
    imagen: DataTypes.STRING,
    historia: DataTypes.TEXT,
  },
  {
    timestamps: false,
    sequelize: db,
    tableName: "personaje",
    modelName: "personaje",
  }
);

export default Character;
