import { Request, Response } from "express";
import { MovieService } from "../services";
import { errorController } from "./error.controller";

export async function getMovie(req: Request, res: Response) {
  const { id } = req.params;
  const query = Object.entries(req.query).length !== 0 ? req.query : undefined;
  try {
    if (!id) {
      const movies = await MovieService.getMovies(query);
      return res.status(200).json({ data: movies });
    }
    const movie = await MovieService.getById(+id);
    return res.status(200).json({ data: movie });
  } catch (error) {
    return errorController(error, req, res);
  }
}
export async function createMovie(req: Request, res: Response) {
  const { body } = req;
  try {
    const movie = await MovieService.createMovie(body);
    return res.status(201).json({ data: movie });
  } catch (error) {
    return errorController(error, req, res);
  }
}
export async function editMovie(req: Request, res: Response) {
  const { body } = req;
  const { id } = req.params;
  try {
    const movie = await MovieService.editMovie(+id, body);

    return res.status(202).json({ data: movie });
  } catch (error) {
    return errorController(error, req, res);
  }
}
export async function deleteMovie(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const success = await MovieService.deleteMovie(+id);
    return res.status(202).json({ success });
  } catch (error) {
    return errorController(error, req, res);
  }
}
