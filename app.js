import express from "express";
import bodyParser from "body-parser";
import categoriasRutas from "./rutas/categoriasRutas.js"
import productoRutas from "./rutas/productosRutas.js"
export const app = express();

app.use(bodyParser.json());

app.use(express.urlencoded({ "extended": true }))

app.use("/categorias", categoriasRutas)
app.use("/productos", productoRutas)


app.listen(3000, () => {
  console.log("holii");
});