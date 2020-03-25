const express = require("express");
const router = express.Router();

const ctrlOfertas = require("../controllers/ofertas.controller");

router.post("/register", ctrlOfertas.register); //registro

router.get("/", ctrlOfertas.getOfertas); //pide todos las ofertas
router.get("/S/:tipo", ctrlOfertas.getOfertasServicios); //pide las ofertas por tipo de centro
router.get("/:id", ctrlOfertas.getOferta); // pide un solo usuario

router.get("/canti", ctrlOfertas.CountOfertas); // Cuenta la cantidad de ofertas

router.put("/edit/:id", ctrlOfertas.UpdateOferta); //editar datos
router.put("/:id", ctrlOfertas.DeleteOferta); //eliminar centro

module.exports = router;
