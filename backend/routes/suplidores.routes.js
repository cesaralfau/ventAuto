const express = require("express");
const router = express.Router();

const ctrlSuplidor = require("../controllers/suplidores.controller");

router.post("/register", ctrlSuplidor.register); //registro

router.get("/", ctrlSuplidor.getSuplidores); //pide todos los supldiores
router.get("/cant", ctrlSuplidor.CountSuplidor); // Cuenta la cantidad de suplidores
router.get("/:id", ctrlSuplidor.getSuplidor); // pide un solo supldior

router.put("/edit/:id", ctrlSuplidor.UpdateSuplidor); //editar datos
router.put("/:id", ctrlSuplidor.DeleteSuplidor); //eliminar centro

module.exports = router;
