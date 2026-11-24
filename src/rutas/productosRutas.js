const express = require("express");
const router = express.Router();
const productosControlador = require("../controlador/productosControlador");

router.get("/", productosControlador.obtenerProductos);
router.get("/categorias", productosControlador.obtenerProductosConCategorias);
router.get("/:id", productosControlador.obtenerProductosPorId);
router.post("/", productosControlador.crearProducto);
router.put("/:id", productosControlador.actualizarProducto);
router.delete("/:id", productosControlador.eliminarProducto);

module.exports = router;
