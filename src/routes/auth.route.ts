import express from "express";
import passport from "../utils/passport-local.util";
import { AuthController } from "../controllers/index";

const router = express.Router();

router.post(
  "/login",
  passport.authenticate("login"),
  AuthController.postLogin
);

router.post(
  "/signup",
  passport.authenticate("signup"),
  AuthController.postSignup
);

router.get("/logout", AuthController.logout);

export default router;
