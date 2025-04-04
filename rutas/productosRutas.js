import express from "express";
import ProductoController from "../controller/productoController.js";

const router = express.Router();

router.get('/', ProductoController.getAllProductos);

router.post('/', ProductoController.createProducto);

router.put('/:id', ProductoController.actualizarProducto);

router.patch('/:id', ProductoController.actualizarParcialProducto);

router.delete('/:id', ProductoController.eliminarProducto);

export default router;

