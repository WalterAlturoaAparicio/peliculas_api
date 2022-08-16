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
import { Character } from "./character.model";
import { Genre } from "./genre.model";
import { GenreMovie } from "./genreMovie.model";
import { MovieCharacter } from "./movieCharacter.model";

export interface movieDetail {
  id: number;
  titulo: string;
  imagen?: string;
  fecha_creacion?: Date;
  calificacion?: number;
  personajesIds?: number[];
  generosIds?: number[];
  personajes?: Character[];
  genero?: Genre[];
}
export type movieInput = Omit<movieDetail, "id">;
export type movieOutput = Pick<
  movieDetail,
  "titulo" | "imagen" | "fecha_creacion"
>;
export type movieFilter = {
  titulo?: string;
  order?: string;
  idGenero?: number;
};

@Scopes(() => ({
  personajes: {
    include: [
      {
        model: Character,
        through: { attributes: [] },
      },
    ],
  },
  genero: {
    include: [
      {
        model: Genre,
        through: { attributes: [] },
      },
    ],
  },
}))
@Table({
  tableName: "pelicula",
  modelName: "pelicula",
})
export class Movie
  extends Model<movieDetail, movieInput>
  implements movieDetail
{
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  titulo!: string;

  @Column
  imagen?: string;

  @Column
  fecha_creacion?: Date;

  @Column
  calificacion?: number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @BelongsToMany(() => Character, () => MovieCharacter)
  personajes!: Character[];

  @BelongsToMany(() => Genre, () => GenreMovie)
  genero!: Genre[];
}
