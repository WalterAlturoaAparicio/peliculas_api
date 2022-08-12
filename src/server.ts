import express, { Application } from "express";
import emoji from "node-emoji";
import morgan from "morgan";
import cors from "cors";

import { CharacterRouter, MovieRouter, AuthRouter } from "./routes";
import { db } from "./db/config";
import passport from "./utils/passport-local.util";
import sessionMiddleware from "./middlewares/session.middleware";
import "./db/dbMongo";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    auth: "/",
    characters: "/characters",
    movies: "/movies",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8081";

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(sessionMiddleware);
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    
    this.app.use(morgan("dev"));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  routes() {
    this.app.use(this.apiPaths.auth, AuthRouter.default);

    this.app.use(this.apiPaths.movies, sessionMiddleware, MovieRouter.default);
    this.app.use(this.apiPaths.characters, CharacterRouter.default);
  }
  async dbConnection() {
    try {
      await db.authenticate();
      console.log(`${emoji.get("egg")} Base de datos conectada! (api)`);
    } catch (error) {
      throw new Error("!!!" + error);
    }
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(
        `${emoji.get("melon")} Servidor corriendo en el puerto: ${this.port}`
      );
    });
  }
}
export default Server;
