const pool = require("../config/bd");

class pedidosModelo {
  static async obtenerTodos() {
    const [rows] = await pool.query("SELECT * FROM pedidos");
    return rows;
  }
  static async obtenerConClientes() {
    const [rows] = await pool.query(
      "SELECT p.id_pedido, p.id_cliente, c.nombre AS nombre_cliente, p.id_empleado, p.fecha_pedido, p.canal FROM pedidos p INNER JOIN clientes c ON p.id_cliente = c.id_cliente",
    );
    return rows;
  }
  static async obtenerPorId(id) {
    const [rows] = await pool.query(
      "SELECT * FROM pedidos WHERE id_pedido = ?",
      [id],
    );
    return rows[0];
  }
  static async crearPedido(idCliente, idEmpleado, fechaPedido, canal) {
    const [result] = await pool.query(
      "INSERT INTO pedidos (id_cliente, id_empleado, fecha_pedido, canal) VALUES (?, ?, ?, ?)",
      [idCliente, idEmpleado, fechaPedido, canal],
    );
    return {
      id: result.insertId,
      id_cliente: idCliente,
      id_empleado: idEmpleado,
      fecha_pedido: fechaPedido,
      canal,
    };
  }
  static async actualizarPedido(id, idCliente, idEmpleado, fechaPedido, canal) {
    await pool.query(
      "UPDATE pedidos SET id_cliente = ?, id_empleado = ?, fecha_pedido = ?, canal = ? WHERE id_pedido = ?",
      [idCliente, idEmpleado, fechaPedido, canal, id],
    );
    return {
      id: Number(id),
      id_cliente: idCliente,
      id_empleado: idEmpleado,
      fecha_pedido: fechaPedido,
      canal,
    };
  }
  static async eliminarPedido(id) {
    const [result] = await pool.query(
      "DELETE FROM pedidos WHERE id_pedido = ?",
      [id],
    );
    return result.affectedRows > 0;
  }
}

module.exports = pedidosModelo;
