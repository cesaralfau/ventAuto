const mongoose = require("mongoose");
const passport = require("passport");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

const Center = require("../models/centrosM");

const ControladorCentros = {};

ControladorCentros.register = (req, res, next) => {
  var center = new Center();
  (center.tipo_centro = req.body.tipo_centro),
    (center.nombre = req.body.nombre),
    (center.rnc = req.body.rnc),
    (center.redes_sociales = req.body.redes_sociales),
    (center.direccion = req.body.direccion),
    (center.telefono = req.body.telefono),
    (center.pais = req.body.pais[0]),
    (center.comentario = req.body.comentario),
    (center.estado = true);


  center.save((err, doc) => {
    if (!err)
      res.json({
        titulo: "Operacion exitosa.",
        contenido: "Centro registrado."
      });
    else {
      if (err.code == 11000)
        res.status(422).json({
          titulo: "Operacion nula.",
          contenido: "Centro introducido ya existe."
        });
      else
        res.json({
          titulo: "Operacion nula.",
          contenido: "Error del servidor."
        });
    }
  });
};

ControladorCentros.getCenters = async (req, res) => {
  const centros = await Center.find({ estado: true });
  res.json(centros);
};

ControladorCentros.getCenter = async (req, res, err) => {
  const centro = await Center.findById(req.params.id, (err, center) => {
    if (err) return res.status(500).send("Error del Servidor!");
    if (!center) {
      res.status(409).json({ mensaje: "Centro no existe" }); //centro no existe
    }
  });
  res.json(centro);
};

ControladorCentros.CountCenter = async (req, res) => {
  const centros = await Center.find({ estado: true }).count();
  res.json(centros);
};

ControladorCentros.UpdateCenter = async (req, res) => {
  const centro = {
    tipo_centro: req.body.tipo_centro,
    nombre: req.body.nombre,
    rnc: req.body.rnc,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    pais: req.body.pais,
    comentario: req.body.comentario,
    redes_sociales: req.body.redes_sociales
  };
  await Center.findByIdAndUpdate(
    req.params.id,
    { $set: centro },
    { new: true },
    function (err, model) {
      if (!err)
        res.json({
          titulo: "Operacion exitosa.",
          contenido: "Centro actualizado."
        });
      else {
        if (err.code == 11000)
          res.status(422).json({
            titulo: "Operacion nula.",
            contenido: "Centro introducido ya existe."
          });
        else
          res.json({
            titulo: "Operacion nula.",
            contenido: "Centro introducido no existe."
          });
      }
    }
  );
};

ControladorCentros.DeleteCenter = async (req, res) => {
  await Center.findByIdAndRemove(req.params.id, function (err, doc) {
    if (err)
      res.status(409).json({
        titulo: "Operacion nula.",
        contenido: "Error del servidor intentar luego"
      });
    else {
      res.json({
        titulo: "Operacion exitosa.",
        contenido: "Centro eliminado."
      });
    }
  });
};

module.exports = ControladorCentros;
