import MongoStore from "connect-mongo";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET || "encriptazion y3e79ye218ye81";

const sessionMiddleware = session({
  store: MongoStore.create({
    mongoUrl: process.env.MONGOURI,
  }),
  resave: false,
  saveUninitialized: false,
  secret,
  cookie: {
    maxAge: 600000,
  },
  rolling: true,
});
export default sessionMiddleware;
