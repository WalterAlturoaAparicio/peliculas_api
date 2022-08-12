import passport from "../utils/passport-local.util";
import { Request, Response } from "express";

export function passportMiddlewareSignup(
  callback: (arg0: any, arg1: any, arg2: any) => any
) {
  return function (req: Request, res: Response, next: (arg0: any) => any) {
    passport.authenticate("signup", (err, user) => {
      if (err) return next(err);
      if (user)
        return res.status(400).json({
          error: {
            code: "USUARIO_EXISTENTE",
            message: "El usuario ya existe",
          },
        });
      req.user = user;
      return callback(req, res, next);
    })(req, res, next);
  };
}
