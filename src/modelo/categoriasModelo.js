const pool = require("../config/bd");

class categoriasModelo {
  static async obtenerTodos() {
    const [rows] = await pool.query("SELECT * FROM categorias");
    return rows;
  }
  static async obtenerPorId(id) {
    const [rows] = await pool.query(
      "SELECT * FROM categorias WHERE id_categoria = ?",
      [id],
    );
    return rows[0];
  }
  static async crearCategoria(nombre) {
    const [result] = await pool.query(
      "INSERT INTO categorias (nombre) VALUES (?)",
      [nombre],
    );
    return { id: result.insertId, nombre };
  }
  static async actualizarCategoria(id, nombre) {
    await pool.query(
      "UPDATE categorias SET nombre = ? WHERE id_categoria = ?",
      [nombre, id],
    );
    return { id: Number(id), nombre };
  }
  static async eliminarCategoria(id) {
    const [result] = await pool.query(
      "DELETE FROM categorias WHERE id_categoria = ?",
      [id],
    );
    return result.affectedRows > 0;
  }
}

module.exports = categoriasModelo;
