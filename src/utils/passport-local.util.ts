import bcrypt from "bcrypt";
import passport from "passport";
import * as UserModel from "../models/user.model";

import pkg from "passport-local";
const { Strategy } = pkg;

function isValidPassword(
  user: { password: string },
  password: string | Buffer
) {
  return bcrypt.compareSync(password, user.password);
}

passport.use(
  "login",
  new Strategy((displayName, password, done) => {
    UserModel.default.findOne({ displayName }, (err: any, user: any) => {
      if (err) return done(err);
      if (!user) {
        return done(new Error("Usuario no encontrado"), false);
      }
      if (!isValidPassword(user, password)) {
        return done(new Error("contrasenia invalida!"), false);
      }
      return done(null, user);
    });
  })
);

function createHash(password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}
passport.use(
  "signup",
  new Strategy(
    {
      passReqToCallback: true,
    },
    (req, displayName, password, done) => {
      const { email } = req.body;
      UserModel.default.findOne(
        {
          $or: [{ displayName }, { email }],
        },
        (err: any, user: any) => {
          if (err) {
            return done(err);
          }
          if (user) {
            return done(new Error("El usuario ya existe!"), false);
          }

          const newUser = {
            displayName,
            password: createHash(password),
            email,
          };

          UserModel.default.create(newUser, (err, user) => {
            if (err) return done(err);
            return done(null, user);
          });
        }
      );
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  UserModel.default.findById(
    id,
    (err: any, user: boolean | Express.User | null | undefined) => {
      done(err, user);
    }
  );
});

export default passport;
