const empleadosModelo = require("../modelo/empleadosModelo");

class empleadosControlador {
  static async obtenerEmpleados(req, res) {
    try {
      const empleados = await empleadosModelo.obtenerTodos();
      return res.status(200).json({ exito: true, data: empleados });
    } catch (error) {
      return res
        .status(500)
        .json({ exito: false, mensaje: "Error al obtener los empleados" });
    }
  }
  static async obtenerEmpleadosPorId(req, res) {
    try {
      const empleado = await empleadosModelo.obtenerPorId(req.params.id);
      return res.status(200).json({ exito: true, data: empleado });
    } catch (error) {
      return res
        .status(500)
        .json({ exito: false, mensaje: "Error al obtener el empleado por ID" });
    }
  }
  static async crearEmpleado(req, res) {
    const { nombre, area } = req.body || {};
    try {
      const empleado = await empleadosModelo.crearEmpleado(nombre, area);
      return res.status(201).json({ exito: true, data: empleado });
    } catch (error) {
      return res
        .status(500)
        .json({ exito: false, mensaje: "Error al crear el empleado" });
    }
  }
  static async actualizarEmpleado(req, res) {
    const { nombre, area } = req.body || {};
    try {
      if (!nombre || !area) {
        return res
          .status(400)
          .json({
            exito: false,
            mensaje: "El nombre y el área son obligatorios",
          });
      }
      const existe = await empleadosModelo.obtenerPorId(req.params.id);
      if (!existe) {
        return res
          .status(404)
          .json({ exito: false, mensaje: "Empleado no encontrado" });
      }
      const empleado = await empleadosModelo.actualizarEmpleado(
        req.params.id,
        nombre,
        area,
      );
      return res.status(200).json({ exito: true, data: empleado });
    } catch (error) {
      return res
        .status(500)
        .json({ exito: false, mensaje: "Error al actualizar el empleado" });
    }
  }
  static async eliminarEmpleado(req, res) {
    try {
      const eliminado = await empleadosModelo.eliminarEmpleado(req.params.id);
      if (!eliminado) {
        return res
          .status(404)
          .json({ exito: false, mensaje: "Empleado no encontrado" });
      }
      return res
        .status(200)
        .json({ exito: true, mensaje: "Empleado eliminado correctamente" });
    } catch (error) {
      return res
        .status(500)
        .json({ exito: false, mensaje: "Error al eliminar el empleado" });
    }
  }
}
module.exports = empleadosControlador;
