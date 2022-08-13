import { NextFunction, Request, Response } from "express"

export function checkAuthentication(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    next()
  }else{
    res.status(401).json({message:"No esta autorizado, por favor loggearse"})
  }
}
