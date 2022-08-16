import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Character } from "./character.model";
import { Movie } from "./movie.model";

@Table({
  tableName: "pelicula_personaje",
  modelName: "pelicula_personaje",
  timestamps: false
})
export class MovieCharacter extends Model<MovieCharacter> {
  @ForeignKey(() => Movie)
  @Column
  idPelicula!: number;

  @ForeignKey(() => Character)
  @Column
  idPersonaje!: number;
}
