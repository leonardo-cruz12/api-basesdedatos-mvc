const categoriasModelo = require("../modelo/categoriasModelo");

class categoriasControlador {
  static async obtenerCategorias(req, res) {
    try {
      const categorias = await categoriasModelo.obtenerTodos();
      return res.status(200).json({ exito: true, data: categorias });
    } catch (error) {
      return res
        .status(500)
        .json({ exito: false, mensaje: "Error al obtener las categorias" });
    }
  }
  static async obtenerCategoriasPorId(req, res) {
    try {
      const categoria = await categoriasModelo.obtenerPorId(req.params.id);
      if (!categoria) {
        return res
          .status(404)
          .json({ exito: false, mensaje: "Categoria no encontrada" });
      }
      return res.status(200).json({ exito: true, data: categoria });
    } catch (error) {
      return res.status(500).json({
        exito: false,
        mensaje: "Error al obtener la categoria por ID",
      });
    }
  }
  static async crearCategoria(req, res) {
    const { nombre } = req.body || {};
    try {
      if (!nombre) {
        return res
          .status(400)
          .json({ exito: false, mensaje: "El nombre es obligatorio" });
      }
      const categoria = await categoriasModelo.crearCategoria(nombre);
      return res.status(201).json({ exito: true, data: categoria });
    } catch (error) {
      return res
        .status(500)
        .json({ exito: false, mensaje: "Error al crear la categoria" });
    }
  }
  static async actualizarCategoria(req, res) {
    const { nombre } = req.body || {};
    try {
      if (!nombre) {
        return res
          .status(400)
          .json({ exito: false, mensaje: "El nombre es obligatorio" });
      }
      const existente = await categoriasModelo.obtenerPorId(req.params.id);
      if (!existente) {
        return res
          .status(404)
          .json({ exito: false, mensaje: "Categoria no encontrada" });
      }
      const categoria = await categoriasModelo.actualizarCategoria(
        req.params.id,
        nombre,
      );
      return res.status(200).json({ exito: true, data: categoria });
    } catch (error) {
      return res
        .status(500)
        .json({ exito: false, mensaje: "Error al actualizar la categoria" });
    }
  }
  static async eliminarCategoria(req, res) {
    try {
      const eliminada = await categoriasModelo.eliminarCategoria(req.params.id);
      if (!eliminada) {
        return res
          .status(404)
          .json({ exito: false, mensaje: "Categoria no encontrada" });
      }
      return res
        .status(200)
        .json({ exito: true, mensaje: "Categoria eliminada correctamente" });
    } catch (error) {
      return res
        .status(500)
        .json({ exito: false, mensaje: "Error al eliminar la categoria" });
    }
  }
}
module.exports = categoriasControlador;
