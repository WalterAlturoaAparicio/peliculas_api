import { Response } from "express";

export function errorController(error: any, _req: any, res: Response) {
  if (error instanceof Error) {
    const { message } = error;
    return res.status(400).json({ message });
  }
  return res.status(400).json({ message: "Error desconocido" });
}
