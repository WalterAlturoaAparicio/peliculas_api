import mongoose, { ConnectOptions } from "mongoose";
import emoji from "node-emoji";
import dotenv from "dotenv";

dotenv.config()

const mongoUrl = process.env.MONGOURI || "";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions;

mongoose.connect(mongoUrl, options, (err) => {
  if (err) console.log(err);
  else
    console.log(
      emoji.get("avocado"),
      "Conectado a la base de datos (usuarios)"
    );
});

export default mongoose;
