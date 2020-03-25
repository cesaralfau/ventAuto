const express = require("express");
const router = express.Router();

const ctrlUser = require("../controllers/user.controller");

const jwtHelper = require("../config/jwtHelper");

router.post("/register", ctrlUser.register); //registro
router.post("/authenticate", ctrlUser.authenticate); //login
router.get("/userProfile", jwtHelper.verifyJwtToken, ctrlUser.userProfile); //perfil

router.get("/", ctrlUser.getUsers); //pide todos los usuarios
router.get("/cant", ctrlUser.CountUsers); // Cuenta la cantidad de usuarios
router.get("/:id", ctrlUser.getUser); // pide un solo usuario

router.put("/edit/:id", ctrlUser.UpdateUser); //editar datos
router.put("/editP/:id", ctrlUser.UpdatePass); //editar contrasena
router.put("/eliminar/:id", ctrlUser.DeleteUser); //cambia estado usuario "eliminar"

module.exports = router;
