const pool = require("../config/bd");

class detallePedidoModelo {
  static async obtenerTodos() {
    const [rows] = await pool.query("SELECT * FROM detalle_pedido");
    return rows;
  }
  static async obtenerPorId(id) {
    const [rows] = await pool.query(
      "SELECT * FROM detalle_pedido WHERE id_detalle = ?",
      [id],
    );
    return rows[0];
  }

  // crear si conocemos el id de producto, unicamente
  static async crearDetalle(idPedido, idProducto, cantidad, precioUnitario) {
    const [result] = await pool.query(
      "INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)",
      [idPedido, idProducto, cantidad, precioUnitario],
    );
    return {
      id: result.insertId,
      id_pedido: idPedido,
      id_producto: idProducto,
      cantidad,
      precio_unitario: precioUnitario,
    };
  }
  static async actualizarDetalle(
    id,
    idPedido,
    idProducto,
    cantidad,
    precioUnitario,
  ) {
    await pool.query(
      "UPDATE detalle_pedido SET id_pedido = ?, id_producto = ?, cantidad = ?, precio_unitario = ? WHERE id_detalle = ?",
      [idPedido, idProducto, cantidad, precioUnitario, id],
    );
    return {
      id: Number(id),
      id_pedido: idPedido,
      id_producto: idProducto,
      cantidad,
      precio_unitario: precioUnitario,
    };
  }
  static async eliminarDetalle(id) {
    const [result] = await pool.query(
      "DELETE FROM detalle_pedido WHERE id_detalle = ?",
      [id],
    );
    return result.affectedRows > 0;
  }

  // INNER JOIN para mostrar el detalle de un pedido (nombre de producto, cantidad y precio) con (detalle_pedido + productos + pedidos)
  static async obtenerDetalleDePedido(idPedido) {
    const [rows] = await pool.query(
      "SELECT d.id_detalle, d.id_pedido, pe.fecha_pedido, p.nombre AS nombre_producto, d.cantidad, d.precio_unitario FROM detalle_pedido d INNER JOIN productos p ON d.id_producto = p.id_producto INNER JOIN pedidos pe ON d.id_pedido = pe.id_pedido WHERE d.id_pedido = ?",
      [idPedido],
    );
    return rows;
  }

  // Se hace de neuevo el INNER JOIN para agrupar por producto y mostrar cuantos se vendieron
  static async obtenerResumenPorProducto() {
    const [rows] = await pool.query(
      "SELECT p.id_producto, p.nombre AS nombre_producto, SUM(d.cantidad) AS total_cantidad, SUM(d.cantidad * d.precio_unitario) AS total_vendido FROM detalle_pedido d INNER JOIN productos p ON d.id_producto = p.id_producto GROUP BY p.id_producto, p.nombre ORDER BY total_vendido DESC",
    );
    return rows;
  }
}

module.exports = detallePedidoModelo;
