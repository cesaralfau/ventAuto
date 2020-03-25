const express = require("express");
const router = express.Router();

const controlador = require("../controllers/reservas.controller");

router.post("/register", controlador.register); //registro

router.get("/", controlador.getAllReservas); //pide todos las reserva sinexcepcion
router.get("/activas", controlador.getReservasActivas); //pide todos las reserva acticas
router.get("/canceladas", controlador.getReservasCanceladas); //pide todos las reserva
router.get("/:id", controlador.getReserva); // pide una sola reserva
router.get("/reserva_por_usuario/:usuario", controlador.getReservaByUser); // pide las reservas del usuario
router.get("/reserva_por_usuario/canceladas/:usuario", controlador.getReservaByUserCanceladas); // pide las reservas canceladas por usuario

router.get("/contar/cant", controlador.Count); //pide todos las reservas

router.put("/edit/:id", controlador.UpdateReserva); //editar datos
router.put("/:id", controlador.DeleteReserva); //eliminar centro

module.exports = router;
