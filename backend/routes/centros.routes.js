const express = require("express");
const router = express.Router();

const ctrlCenter = require("../controllers/centros.controller");

router.post("/register", ctrlCenter.register); //registro

router.get("/", ctrlCenter.getCenters); //pide todos los usuarios
router.get("/cant", ctrlCenter.CountCenter); // Cuenta la cantidad de usuarios
router.get("/:id", ctrlCenter.getCenter); // pide un solo usuario

router.put("/edit/:id", ctrlCenter.UpdateCenter); //editar datos
router.delete("/:id", ctrlCenter.DeleteCenter); //eliminar centro

module.exports = router;
