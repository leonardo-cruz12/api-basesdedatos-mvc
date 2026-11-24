const express = require("express");
const router = express.Router();
const pedidosControlador = require("../controlador/pedidosControlador");

router.get("/", pedidosControlador.obtenerPedidos);
router.get("/clientes", pedidosControlador.obtenerPedidosConClientes);
router.get("/:id", pedidosControlador.obtenerPedidosPorId);
router.post("/", pedidosControlador.crearPedido);
router.put("/:id", pedidosControlador.actualizarPedido);
router.delete("/:id", pedidosControlador.eliminarPedido);

module.exports = router;
