const express = require("express");
const router = express.Router();

const controlador = require("../controllers/reservas_fav.controller");

router.post("/register", controlador.register); //registro

router.get("/", controlador.getAllReservas); //pide todos las reserva sinexcepcion
router.get("/activas", controlador.getReservasActivas); //pide todos las reserva acticas
router.get("/canceladas", controlador.getReservasCanceladas); //pide todos las reserva
router.get("/:id", controlador.getReserva); // pide una sola reserva
router.get("/reserva_por_usuario/all/:usuario", controlador.getAllReservaByUser); // pide las reservas del usuario
router.get("/get_reserva_id/:usuario/:oferta", controlador.getReservasByUserAndOfert); // pide las reservas del usuario


router.get("/contar/cant", controlador.Count); //pide todos las reservas

router.put("/edit/:id", controlador.UpdateReserva); //editar datos
router.delete("/:id", controlador.DeleteReserva); //eliminar centro

module.exports = router;
