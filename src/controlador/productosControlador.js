const productosModelo = require("../modelo/productosModelo");

class productosControlador {
  static async obtenerProductos(req, res) {
    try {
      const productos = await productosModelo.obtenerTodos();
      return res.status(200).json({ exito: true, data: productos });
    } catch (error) {
      return res
        .status(500)
        .json({ exito: false, mensaje: "Error al obtener los productos" });
    }
  }
  static async obtenerProductosConCategorias(req, res) {
    try {
      const productos = await productosModelo.obtenerConCategorias();
      return res.status(200).json({ exito: true, data: productos });
    } catch (error) {
      return res.status(500).json({
        exito: false,
        mensaje: "Error al obtener los productos con el nombre de la categoria",
      });
    }
  }
  static async obtenerProductosPorId(req, res) {
    try {
      const producto = await productosModelo.obtenerPorId(req.params.id);
      if (!producto) {
        return res
          .status(404)
          .json({ exito: false, mensaje: "Producto no encontrado" });
      }
      return res.status(200).json({ exito: true, data: producto });
    } catch (error) {
      return res
        .status(500)
        .json({ exito: false, mensaje: "Error al obtener el producto por ID" });
    }
  }
  static async crearProducto(req, res) {
    const {
      nombre,
      id_categoria: idCategoria = null,
      precio,
      costo,
      stock,
    } = req.body || {};
    try {
      if (
        !nombre ||
        precio === undefined ||
        costo === undefined ||
        stock === undefined
      ) {
        return res.status(400).json({
          exito: false,
          mensaje: "El nombre, el precio, el costo y el stock son obligatorios",
        });
      }
      const producto = await productosModelo.crearProducto(
        nombre,
        idCategoria,
        precio,
        costo,
        stock,
      );
      return res.status(201).json({ exito: true, data: producto });
    } catch (error) {
      if (error.code === "ER_NO_REFERENCED_ROW_2") {
        return res.status(400).json({
          exito: false,
          mensaje: "La categoria indicada no existe",
        });
      }
      return res
        .status(500)
        .json({ exito: false, mensaje: "Error al crear el producto" });
    }
  }
  static async actualizarProducto(req, res) {
    const {
      nombre,
      id_categoria: idCategoria = null,
      precio,
      costo,
      stock,
    } = req.body || {};
    try {
      if (
        !nombre ||
        precio === undefined ||
        costo === undefined ||
        stock === undefined
      ) {
        return res.status(400).json({
          exito: false,
          mensaje: "El nombre, el precio, el costo y el stock son obligatorios",
        });
      }
      const existente = await productosModelo.obtenerPorId(req.params.id);
      if (!existente) {
        return res
          .status(404)
          .json({ exito: false, mensaje: "Producto no encontrado" });
      }
      const producto = await productosModelo.actualizarProducto(
        req.params.id,
        nombre,
        idCategoria,
        precio,
        costo,
        stock,
      );
      return res.status(200).json({ exito: true, data: producto });
    } catch (error) {
      if (error.code === "ER_NO_REFERENCED_ROW_2") {
        return res.status(400).json({
          exito: false,
          mensaje: "La categoria indicada no existe",
        });
      }
      return res
        .status(500)
        .json({ exito: false, mensaje: "Error al actualizar el producto" });
    }
  }
  static async eliminarProducto(req, res) {
    try {
      const eliminado = await productosModelo.eliminarProducto(req.params.id);
      if (!eliminado) {
        return res
          .status(404)
          .json({ exito: false, mensaje: "Producto no encontrado" });
      }
      return res
        .status(200)
        .json({ exito: true, mensaje: "Producto eliminado correctamente" });
    } catch (error) {
      return res
        .status(500)
        .json({ exito: false, mensaje: "Error al eliminar el producto" });
    }
  }
}
module.exports = productosControlador;
