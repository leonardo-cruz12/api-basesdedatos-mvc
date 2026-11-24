const pool = require("../config/bd");

class productosModelo {
  static async obtenerTodos() {
    const [rows] = await pool.query("SELECT * FROM productos");
    return rows;
  }
  static async obtenerConCategorias() {
    const [rows] = await pool.query(
      "SELECT p.id_producto, p.nombre, p.id_categoria, c.nombre AS nombre_categoria, p.precio, p.costo, p.stock FROM productos p INNER JOIN categorias c ON p.id_categoria = c.id_categoria",
    );
    return rows;
  }
  static async obtenerPorId(id) {
    const [rows] = await pool.query(
      "SELECT * FROM productos WHERE id_producto = ?",
      [id],
    );
    return rows[0];
  }
  static async crearProducto(nombre, idCategoria, precio, costo, stock) {
    const [result] = await pool.query(
      "INSERT INTO productos (nombre, id_categoria, precio, costo, stock) VALUES (?, ?, ?, ?, ?)",
      [nombre, idCategoria, precio, costo, stock],
    );
    return {
      id: result.insertId,
      nombre,
      id_categoria: idCategoria,
      precio,
      costo,
      stock,
    };
  }
  static async actualizarProducto(
    id,
    nombre,
    idCategoria,
    precio,
    costo,
    stock,
  ) {
    await pool.query(
      "UPDATE productos SET nombre = ?, id_categoria = ?, precio = ?, costo = ?, stock = ? WHERE id_producto = ?",
      [nombre, idCategoria, precio, costo, stock, id],
    );
    return {
      id: Number(id),
      nombre,
      id_categoria: idCategoria,
      precio,
      costo,
      stock,
    };
  }
  static async eliminarProducto(id) {
    const [result] = await pool.query(
      "DELETE FROM productos WHERE id_producto = ?",
      [id],
    );
    return result.affectedRows > 0;
  }
}

module.exports = productosModelo;
