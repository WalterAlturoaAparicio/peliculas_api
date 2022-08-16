import {
  AutoIncrement,
  BelongsToMany,
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Scopes,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { Movie } from "./movie.model";
import { MovieCharacter } from "./movieCharacter.model";

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
export type characterOutput = Pick<characterDetail, "nombre" | "imagen">;
export type characterFilter = Pick<characterDetail, "edad" | "peso"> & {
  nombre?: string;
  idPelicula?: number;
};

@Scopes(() => ({
  peliculas: {
    include: [
      {
        model: Movie,
        through: { attributes: [] },
      },
    ],
  },
}))
@Table({
  tableName: "personaje",
  modelName: "personaje",
})
export class Character
  extends Model<characterDetail, characterInput>
  implements characterDetail
{
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  nombre!: string;

  @Column
  imagen?: string;

  @Column
  edad?: number;

  @Column
  peso?: number;

  @Column
  historia?: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @BelongsToMany(() => Movie, () => MovieCharacter)
  peliculas!: Movie[];
}
