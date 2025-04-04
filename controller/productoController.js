import Producto from "../Models/producto.js";


class ProductoController {
  static getAllProductos = async (req, res) => {
    const OBJProducto = new Producto();
    const productos = await OBJProducto.getAll();
    res.json(productos);
  }
  static createProducto = async (req, res) => {
    try {
      const { nombre, descripcion, precio,categoria_id } = req.body;
      const OBJProducto = new Producto();
      const producto = await OBJProducto.create(nombre, descripcion, precio,categoria_id);
      res.status(201).json(producto);
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  static actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion,precio,categoria_id } = req.body;
    try {
      const OBJProducto = new Producto();
      const producto = await OBJProducto.update(nombre, descripcion,precio,categoria_id, id);
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  static actualizarParcialProducto = async (req, res) => {
    const {id} = req.params;
    const campos = req.body;
    try {
      const OBJProducto = new Producto();
      const producto = await OBJProducto.updateParcial(id,campos);
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  static eliminarProducto = async (req, res)=>{
    const {id} = req.params;
    try {
      const OBJProducto = new Producto();
      const producto = await OBJProducto.eliminar(id);
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

export default ProductoController;