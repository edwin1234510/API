import express from "express";
import bodyParser from "body-parser";
import categoriasRutas from "./rutas/categoriasRutas.js"

export const app = express();

app.use(bodyParser.json());

app.use(express.urlencoded({ "extended": true }))

app.use("/categorias", categoriasRutas)

app.listen(3000, () => {
  console.log("holii");
});