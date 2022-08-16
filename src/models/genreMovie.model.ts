import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Genre } from "./genre.model";
import { Movie } from "./movie.model";

@Table({
  tableName: "genero_pelicula",
  modelName: "genero_pelicula",
  timestamps: false
})
export class GenreMovie extends Model<GenreMovie> {
  @ForeignKey(() => Movie)
  @Column
  idPelicula!: number;

  @ForeignKey(() => Genre)
  @Column
  idGenero!: number;
}   