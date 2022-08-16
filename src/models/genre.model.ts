import {
  AutoIncrement,
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { GenreMovie } from "./genreMovie.model";
import { Movie } from "./movie.model";

export interface genre {
  id: number;
  nombre: string;
  imagen?: string;
  peliculasIds?: number[];
}

@Table({
  tableName: "genero",
  modelName: "genero",
  timestamps: false,
})
export class Genre extends Model<genre> implements genre {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  nombre!: string;

  @Column
  imagen?: string;

  @BelongsToMany(() => Movie, () => GenreMovie)
  peliculas?: Movie[];
}
