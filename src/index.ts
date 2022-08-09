import express from "express";
import dotenv from "dotenv";
import emoji from "node-emoji";
import morgan from "morgan"

import { characterRouter } from "./routes/index";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8081;

app.use(morgan("dev"));

app.use('/characters', characterRouter.router)
app.use('/movies', characterRouter.router)

app.listen(PORT, () => {
  console.log(`${emoji.get("melon")} Servidor corriendo en el puerto: ${PORT}`);
});
