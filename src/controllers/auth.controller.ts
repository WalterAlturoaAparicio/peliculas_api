import { NextFunction, Request, Response } from "express";

export function postLogin(req: Request, res: Response) {
  const user = req.user;
  res.status(202).json({ user });
}

export function postSignup(req: Request, res: Response) {
  const user = req.user;
  res.status(201).json({ user });
}

export function logout(req: Request, res: Response, next: NextFunction) {
  req.logout((err) => {
    return next(err);
  });
  res.status(200).json({ message: "Logout!" });
}
export function failLogin(
  err: Error | any,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (err)
    return res.status(400).json({ success: false, message: err.message });
  return next();
}
