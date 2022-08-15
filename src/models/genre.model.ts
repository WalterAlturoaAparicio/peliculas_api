import { DataTypes } from 'sequelize'
import { db } from '../db/config';
// import { movieDetail } from './movie.model';

export interface genre {
  id: number;
  imagen?: string;
  nombre: string;
  peliculas?: number[] | undefined;
};

const Genre = db.define('Genero', {
  nombre: DataTypes.STRING,
  imagen: DataTypes.STRING,
})
export default Genre;