import connection from "../utils/db.js";


class Producto {
  constructor(nombre, descripcion,precio,categoria_id) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.categoria_id = categoria_id;
  }
  /**
   * metodo para obtener los registros de la base de datos 
   * @returns {array} listado de productos de un arreglo
   */

  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM productos");
      return rows;
    } catch (error) {
      throw new Error("error al obtener los productos");
    }
  }

  async create() {
    try {
      const [result] = await connection.query("INSERT INTO productos (nombre,descripcion,precio,categoria_id) VALUES (?,?,?,?)", [nombre, descripcion, precio, categoria_id]);
      return {id: result.id,nombre,descripcion,precio,categoria_id}
    } catch (error) {
      throw new Error("error al crear el producto");
    }
  }
  async update(nombre, descripcion,precio,categoria_id, id) {
    try {
      const [result] = await connection.query("UPDATE productos SET nombre = ?,descripcion = ?,precio = ?,categoria_id = ? WHERE id = ?", [nombre, descripcion,precio,categoria_id, id]);
      if (result.affectedRows === 0) {
        throw new Error("producto no encontrada");
      }
      return { nombre, descripcion,precio,categoria_id,id }
    } catch (error) {

    }
  }
  async updateParcial(id,campos) {
    for (const propiedad in campos) {
      const [result] = await connection.query(`UPDATE productos SET ${propiedad} = ? WHERE id = ?`, [campos[propiedad], id]);
    }
    const [rows] = await connection.query("SELECT * FROM productos WHERE id = ?", [id]);
    return rows;
  }
  async eliminar (id){
    try {
      const [result] = await connection.query("DELETE FROM productos WHERE id = ?", [id]);
      return result;
    } catch (error) {
      throw new Error("error al eliminar el producto");
    }
  }
}

export default Producto;