const pedidosModelo = require("../modelo/pedidosModelo");

class pedidosControlador {
  static async obtenerPedidos(req, res) {
    try {
      const pedidos = await pedidosModelo.obtenerTodos();
      return res.status(200).json({ exito: true, data: pedidos });
    } catch (error) {
      return res
        .status(500)
        .json({ exito: false, mensaje: "Error al obtener los pedidos" });
    }
  }
  static async obtenerPedidosConClientes(req, res) {
    try {
      const pedidos = await pedidosModelo.obtenerConClientes();
      return res.status(200).json({ exito: true, data: pedidos });
    } catch (error) {
      return res.status(500).json({
        exito: false,
        mensaje: "Error al obtener los pedidos con el nombre del cliente",
      });
    }
  }
  static async obtenerPedidosPorId(req, res) {
    try {
      const pedido = await pedidosModelo.obtenerPorId(req.params.id);
      if (!pedido) {
        return res
          .status(404)
          .json({ exito: false, mensaje: "Pedido no encontrado" });
      }
      return res.status(200).json({ exito: true, data: pedido });
    } catch (error) {
      return res
        .status(500)
        .json({ exito: false, mensaje: "Error al obtener el pedido por ID" });
    }
  }
  static async crearPedido(req, res) {
    const {
      id_cliente: idCliente = null,
      id_empleado: idEmpleado = null,
      fecha_pedido: fechaPedido,
      canal,
    } = req.body || {};
    try {
      if (!fechaPedido || !canal) {
        return res.status(400).json({
          exito: false,
          mensaje: "La fecha del pedido y el canal son obligatorios",
        });
      }
      const pedido = await pedidosModelo.crearPedido(
        idCliente,
        idEmpleado,
        fechaPedido,
        canal,
      );
      return res.status(201).json({ exito: true, data: pedido });
    } catch (error) {
      if (error.code === "ER_NO_REFERENCED_ROW_2") {
        return res.status(400).json({
          exito: false,
          mensaje: "El cliente o el empleado indicado no existe",
        });
      }
      return res
        .status(500)
        .json({ exito: false, mensaje: "Error al crear el pedido" });
    }
  }
  static async actualizarPedido(req, res) {
    const {
      id_cliente: idCliente = null,
      id_empleado: idEmpleado = null,
      fecha_pedido: fechaPedido,
      canal,
    } = req.body || {};
    try {
      if (!fechaPedido || !canal) {
        return res.status(400).json({
          exito: false,
          mensaje: "La fecha del pedido y el canal son obligatorios",
        });
      }
      const existente = await pedidosModelo.obtenerPorId(req.params.id);
      if (!existente) {
        return res
          .status(404)
          .json({ exito: false, mensaje: "Pedido no encontrado" });
      }
      const pedido = await pedidosModelo.actualizarPedido(
        req.params.id,
        idCliente,
        idEmpleado,
        fechaPedido,
        canal,
      );
      return res.status(200).json({ exito: true, data: pedido });
    } catch (error) {
      if (error.code === "ER_NO_REFERENCED_ROW_2") {
        return res.status(400).json({
          exito: false,
          mensaje: "El cliente o el empleado indicado no existe",
        });
      }
      return res
        .status(500)
        .json({ exito: false, mensaje: "Error al actualizar el pedido" });
    }
  }
  static async eliminarPedido(req, res) {
    try {
      const eliminado = await pedidosModelo.eliminarPedido(req.params.id);
      if (!eliminado) {
        return res
          .status(404)
          .json({ exito: false, mensaje: "Pedido no encontrado" });
      }
      return res
        .status(200)
        .json({ exito: true, mensaje: "Pedido eliminado correctamente" });
    } catch (error) {
      return res
        .status(500)
        .json({ exito: false, mensaje: "Error al eliminar el pedido" });
    }
  }
}
module.exports = pedidosControlador;
