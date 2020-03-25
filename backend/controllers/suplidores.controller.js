const mongoose = require("mongoose");
const passport = require("passport");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

const Suplidor = require("../models/suplidoresM");

const ControladorSuplidor = {};

ControladorSuplidor.register = (req, res, next) => {
  var supli = new Suplidor();
  (supli.nombre = req.body.nombre),
    (supli.rnc = req.body.rnc),
    (supli.direccion = req.body.direccion),
    (supli.telefono = req.body.telefono),
    (supli.email = req.body.email),
    (supli.estado = true);


  supli.save((err, doc) => {
    if (!err)
      res.json({
        titulo: "Operacion exitosa.",
        contenido: "Suplidor registrado."
      });
    else {
      if (err.code == 11000)
        res
          .status(422)
          .json({
            titulo: "Operacion nula.",
            contenido: "Suplidor introducido ya existe."
          });
      else
        res.json({
          titulo: "Operacion nula.",
          contenido: "Error del servidor."
        });
    }
  });
};

ControladorSuplidor.getSuplidores = async (req, res) => {
  const supli = await Suplidor.find({ estado: true });
  res.json(supli);
};

ControladorSuplidor.getSuplidor = async (req, res, err) => {
  const centro = await Suplidor.findById(req.params.id, (err, center) => {
    if (err) return res.status(500).send("Error del Servidor!");
    if (!center) {
      res.status(409).json({ mensaje: "Suplidor no existe" }); //centro no existe
    }
  });
  res.json(centro);
};

ControladorSuplidor.CountSuplidor = async (req, res) => {
  const supli = await Suplidor.find({ estado: true }).count();
  res.json(supli);
};

ControladorSuplidor.UpdateSuplidor = async (req, res) => {
  const centro = {
    nombre: req.body.nombre,
    rnc: req.body.rnc,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    email: req.body.email
  };
  await Suplidor.findByIdAndUpdate(
    req.params.id,
    { $set: centro },
    { new: true },
    function (err, model) {
      if (!err)
        res.json({
          titulo: "Operacion exitosa.",
          contenido: "Suplidor actualizado."
        });
      else {
        if (err.code == 11000)
          res
            .status(422)
            .json({
              titulo: "Operacion nula.",
              contenido: "Suplidor introducido ya existe."
            });
        else
          res.json({
            titulo: "Operacion nula.",
            contenido: "Suplidor introducido no existe."
          });
      }
    }
  );
};

ControladorSuplidor.DeleteSuplidor = async (req, res) => {
  const suplidor = {
    estado: false
  };
  await Suplidor.findByIdAndUpdate(
    req.params.id,
    { $set: suplidor },
    { new: true },
    function (err, model) {
      if (!err)
        res.json({
          titulo: "Operacion exitosa.",
          contenido: "Suplidor eliminado."
        });
      else {
        res.json({
          titulo: "Operacion nula.",
          contenido: "Error del servidor intente luego."
        });
      }
    }
  );
};

// ControladorSuplidor.DeleteSuplidor = async (req, res) => {
//     await Suplidor.findByIdAndRemove(req.params.id, function(err, doc) {
//         if (err)
//             res.status(409).json({titulo:'Operacion nula.',contenido:'Error del servidor intentar luego'})
//         else {
//             res.json({titulo:'Operacion exitosa.',contenido:'Centro eliminado.'});

//         }
//     });
// }

module.exports = ControladorSuplidor;
