const detallePedidoModelo = require("../modelo/detallePedidoModelo");

class detallePedidoControlador {
  static async obtenerDetalles(req, res) {
    try {
      const detalles = await detallePedidoModelo.obtenerTodos();
      return res.status(200).json({ exito: true, data: detalles });
    } catch (error) {
      return res
        .status(500)
        .json({ exito: false, mensaje: "Errror en los detalles" });
    }
  }
  static async obtenerDetallesPorId(req, res) {
    try {
      const detalle = await detallePedidoModelo.obtenerPorId(req.params.id);
      if (!detalle) {
        return res.status(404).json({ exito: false, mensaje: "No encontrado" });
      }
      return res.status(200).json({ exito: true, data: detalle });
    } catch (error) {
      return res
        .status(500)
        .json({ exito: false, mensaje: "Error al obtener el detalle" });
    }
  }
  static async obtenerDetalleDePedido(req, res) {
    try {
      const detalles = await detallePedidoModelo.obtenerDetalleDePedido(
        req.params.id,
      );
      return res.status(200).json({ exito: true, data: detalles });
    } catch (error) {
      return res.status(500).json({
        exito: false,
        mensaje: "Error al obtener los detalles del pedido",
      });
    }
  }
  static async obtenerResumenPorProducto(req, res) {
    try {
      const resumen = await detallePedidoModelo.obtenerResumenPorProducto();
      return res.status(200).json({ exito: true, data: resumen });
    } catch (error) {
      return res.status(500).json({
        exito: false,
        mensaje: "Error al obtener el resumen",
      });
    }
  }
  static async crearDetalle(req, res) {
    const {
      id_pedido: idPedido,
      id_producto: idProducto,
      cantidad,
      precio_unitario: precioUnitario,
    } = req.body || {};
    try {
      const detalle = await detallePedidoModelo.crearDetalle(
        idPedido,
        idProducto,
        cantidad,
        precioUnitario,
      );
      return res.status(201).json({ exito: true, data: detalle });
    } catch (error) {
      return res.status(500).json({ exito: false, mensaje: "Error al crear" });
    }
  }
  static async actualizarDetalle(req, res) {
    const {
      id_pedido: idPedido,
      id_producto: idProducto,
      cantidad,
      precio_unitario: precioUnitario,
    } = req.body || {};
    try {
      const existente = await detallePedidoModelo.obtenerPorId(req.params.id);
      if (!existente) {
        return res.status(404).json({ exito: false, mensaje: "No encontrado" });
      }
      const detalle = await detallePedidoModelo.actualizarDetalle(
        req.params.id,
        idPedido,
        idProducto,
        cantidad,
        precioUnitario,
      );
      return res.status(200).json({ exito: true, data: detalle });
    } catch (error) {
      return res
        .status(500)
        .json({ exito: false, mensaje: "Error al actualizar" });
    }
  }
  static async eliminarDetalle(req, res) {
    try {
      const eliminado = await detallePedidoModelo.eliminarDetalle(
        req.params.id,
      );
      if (!eliminado) {
        return res.status(404).json({ exito: false, mensaje: "No encontrado" });
      }
      return res
        .status(200)
        .json({ exito: true, mensaje: "Detalle eliminado correctamente" });
    } catch (error) {
      return res
        .status(500)
        .json({ exito: false, mensaje: "Error al eliminar" });
    }
  }
}
module.exports = detallePedidoControlador;
