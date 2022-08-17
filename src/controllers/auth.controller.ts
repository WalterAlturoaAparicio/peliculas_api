import { NextFunction, Request, Response } from "express";
import mailService from "../services/mail.service";

export function postLogin(req: Request, res: Response) {
  const user = req.user;
  res.status(202).json({ user });
}

export async function postSignup(req: Request, res: Response) {
  const user = req.user;
  mailService(req.body.email);
  return res.status(201).json({ user });
  
}

export function logout(req: Request, res: Response, next: NextFunction) {
  req.logout((err) => {
    return next(err);
  });
  res.status(200).json({ message: "Logout!" });
}
export function failMiddleware(
  err: Error | any,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (err)
    return res.status(400).json({ success: false, message: err.message });
  return next();
}
