const pool = require("../config/bd");

class empleadosModelo {
  static async obtenerTodos() {
    const [rows] = await pool.query("SELECT * FROM empleados");
    return rows;
  }
  static async obtenerPorId(id) {
    const [rows] = await pool.query(
      "SELECT * FROM empleados WHERE id_empleado = ?",
      [id],
    );
    return rows[0];
  }
  static async crearEmpleado(nombre, area) {
    const [result] = await pool.query(
      "INSERT INTO empleados (nombre, area) VALUES (?, ?)",
      [nombre, area],
    );
    return { id: result.insertId, nombre, area };
  }
  static async actualizarEmpleado(id, nombre, area) {
    await pool.query(
      "UPDATE empleados SET nombre = ?, area = ? WHERE id_empleado = ?",
      [nombre, area, id],
    );
    return { id: Number(id), nombre, area };
  }
  static async eliminarEmpleado(id) {
    const [result] = await pool.query(
      "DELETE FROM empleados WHERE id_empleado = ?",
      [id],
    );
    return result.affectedRows > 0;
  }
}

module.exports = empleadosModelo;
