const pool = require("../config/bd");

class clientesModelo {
  static async obtenerTodos() {
    const [rows] = await pool.query("SELECT * FROM clientes");
    return rows;
  }
  static async obtenerPorId(id) {
    const [rows] = await pool.query(
      "SELECT * FROM clientes WHERE id_cliente = ?",
      [id],
    );
    return rows[0];
  }
  static async crearCliente(nombre, ciudad, fechaRegistro) {
    const [result] = await pool.query(
      "INSERT INTO clientes (nombre, ciudad, fecha_registro) VALUES (?, ?, ?)",
      [nombre, ciudad, fechaRegistro],
    );
    return {
      id: result.insertId,
      nombre,
      ciudad,
      fecha_registro: fechaRegistro,
    };
  }
  static async actualizarCliente(id, nombre, ciudad, fechaRegistro) {
    await pool.query(
      "UPDATE clientes SET nombre = ?, ciudad = ?, fecha_registro = ? WHERE id_cliente = ?",
      [nombre, ciudad, fechaRegistro, id],
    );
    return {
      id: Number(id),
      nombre,
      ciudad,
      fecha_registro: fechaRegistro,
    };
  }
  static async eliminarCliente(id) {
    const [result] = await pool.query(
      "DELETE FROM clientes WHERE id_cliente = ?",
      [id],
    );
    return result.affectedRows > 0;
  }
}

module.exports = clientesModelo;
