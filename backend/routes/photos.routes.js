const express = require("express");
const router = express.Router();

const photo = require("../controllers/photos.controller");

const multipart = require("connect-multiparty");
const multipartMiddleware = multipart({
    uploadDir: "./uploads"
});

//router.get("/:filename", multipartMiddleware, photo.getOnePhoto); //muestra una foto
//router.get("/dataID/:url", photo.getIdOnePhoto); //busca el id de una foto
//router.get("/data/:url", photo.getDataOnePhoto); //busca el data de una foto

router.get("/", photo.getAllPhotos); // pide todas las fotos
router.post("/subir/:nombre/:uso", multipartMiddleware, photo.CreatePhoto); // crea una photo
router.put("/udt/:id/:nombre/:uso/", multipartMiddleware, photo.UpdatePhoto); // actualiza una photo
router.put("/udtData/:id/:nombre/:uso/", photo.UpdateDataPhoto); // actualiza una photo
router.delete("/borrar/:url", photo.DeletePhoto); // elimina una photo
router.delete("/borrar/:url/:id", photo.DeletePhotoAndData); // elimina una photo

module.exports = router;