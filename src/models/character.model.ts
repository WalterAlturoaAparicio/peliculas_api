import { DataTypes, Optional, Model } from "sequelize";
import { db } from "../db/config";
import { genre } from "./genre.model";
import { movie } from "./movie.model";

export interface characterDetail extends genre {
  edad?: number;
  peso?: number;
  historia?: string;
}
export type character = Pick<characterDetail, "nombre" | "imagen">;

export interface characterInput extends Optional<character, "imagen"> {}
export interface characterOutput extends Required<characterDetail> {}

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
  peliculas?: movie[];
}
Character.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
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
    tableName: 'personaje',
    modelName: 'personaje'
  }
);
export default Character;
