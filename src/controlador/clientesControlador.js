const clientesModelo = require("../modelo/clientesModelo");

class clientesControlador {
  static async obtenerClientes(req, res) {
    try {
      const clientes = await clientesModelo.obtenerTodos();
      return res.status(200).json({ exito: true, data: clientes });
    } catch (error) {
      return res
        .status(500)
        .json({ exito: false, mensaje: "Error al obtener los clientes" });
    }
  }
  static async obtenerClientesPorId(req, res) {
    try {
      const cliente = await clientesModelo.obtenerPorId(req.params.id);
      if (!cliente) {
        return res
          .status(404)
          .json({ exito: false, mensaje: "Cliente no encontrado" });
      }
      return res.status(200).json({ exito: true, data: cliente });
    } catch (error) {
      return res
        .status(500)
        .json({ exito: false, mensaje: "Error al obtener el cliente por ID" });
    }
  }
  static async crearCliente(req, res) {
    const { nombre, ciudad, fecha_registro: fechaRegistro } = req.body || {};
    try {
      if (!nombre || !ciudad || !fechaRegistro) {
        return res.status(400).json({
          exito: false,
          mensaje:
            "El nombre, la ciudad y la fecha de registro son obligatorios",
        });
      }
      const cliente = await clientesModelo.crearCliente(
        nombre,
        ciudad,
        fechaRegistro,
      );
      return res.status(201).json({ exito: true, data: cliente });
    } catch (error) {
      return res
        .status(500)
        .json({ exito: false, mensaje: "Error al crear el cliente" });
    }
  }
  static async actualizarCliente(req, res) {
    const { nombre, ciudad, fecha_registro: fechaRegistro } = req.body || {};
    try {
      if (!nombre || !ciudad || !fechaRegistro) {
        return res.status(400).json({
          exito: false,
          mensaje:
            "El nombre, la ciudad y la fecha de registro son obligatorios",
        });
      }
      const existente = await clientesModelo.obtenerPorId(req.params.id);
      if (!existente) {
        return res
          .status(404)
          .json({ exito: false, mensaje: "Cliente no encontrado" });
      }
      const cliente = await clientesModelo.actualizarCliente(
        req.params.id,
        nombre,
        ciudad,
        fechaRegistro,
      );
      return res.status(200).json({ exito: true, data: cliente });
    } catch (error) {
      return res
        .status(500)
        .json({ exito: false, mensaje: "Error al actualizar el cliente" });
    }
  }
  static async eliminarCliente(req, res) {
    try {
      const eliminado = await clientesModelo.eliminarCliente(req.params.id);
      if (!eliminado) {
        return res
          .status(404)
          .json({ exito: false, mensaje: "Cliente no encontrado" });
      }
      return res
        .status(200)
        .json({ exito: true, mensaje: "Cliente eliminado correctamente" });
    } catch (error) {
      return res
        .status(500)
        .json({ exito: false, mensaje: "Error al eliminar el cliente" });
    }
  }
}
module.exports = clientesControlador;
