import connection from "../utils/db.js";


class Categoria {
  // constructor(nombre, descripcion) {
  //   this.nombre = nombre;
  //   this.descripcion = descripcion;
  // }
  /**
   * metodo para obtener los registros de la base de datos 
   * @returns {array} listado de categorias de un arreglo
   */

  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM categorias");
      return rows;
    } catch (error) {
      throw new Error("error al obtener las categorias");
    }
  }

  async create(nombre, descripcion) {
    try {
      const [result] = await connection.query("INSERT INTO categorias (nombre,descripcion) VALUES (?,?)", [nombre, descripcion]);
      return {
        id: result.id, nombre, descripcion
      }
    } catch (error) {
      throw new Error("error al crear la categoria");
    }
  }

  async update(nombre, descripcion, id) {
    try {
      const [result] = await connection.query("UPDATE categorias SET nombre = ?,descripcion = ? WHERE id = ?", [nombre, descripcion, id]);
      if (result.affectedRows === 0) {
        throw new Error("categoria no encontrada");
      }
      return { id, nombre, descripcion }
    } catch (error) {

    }
  }
  async updateParcial(id,campos) {
    for (const propiedad in campos) {
      const [result] = await connection.query(`UPDATE categorias SET ${propiedad} = ? WHERE id = ?`, [campos[propiedad], id]);
    }
    const [rows] = await connection.query("SELECT * FROM categorias WHERE id = ?", [id]);
    return rows;
  }
  async validarCategorias (categoria_id) {
    const [rows] = await connection.query("SELECT * FROM productos WHERE categoria_id = ?",[categoria_id]);
    return rows.length>0;
  }
  async eliminar (id){
    try {
      if(await this.validarCategorias(id)){
        throw new Error("no se puede eliminar la categoria porque tiene productos asociados");
      }
      const [result] = await connection.query("DELETE FROM categorias WHERE id = ?", [id]);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default Categoria;