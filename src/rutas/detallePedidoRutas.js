const express = require("express");
const router = express.Router();
const detallePedidoControlador = require("../controlador/detallePedidoControlador");

router.get("/", detallePedidoControlador.obtenerDetalles);
router.get("/resumen", detallePedidoControlador.obtenerResumenPorProducto);
router.get("/pedido/:id", detallePedidoControlador.obtenerDetalleDePedido);
router.get("/:id", detallePedidoControlador.obtenerDetallesPorId);
router.post("/", detallePedidoControlador.crearDetalle);
router.put("/:id", detallePedidoControlador.actualizarDetalle);
router.delete("/:id", detallePedidoControlador.eliminarDetalle);

module.exports = router;
