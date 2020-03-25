const mongoose = require("mongoose");
const passport = require("passport");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

const tipoCenter = require("../models/tipoCentrosM");

const ControladorTipoCentros = {};

ControladorTipoCentros.CrearTipoCentro = (req, res, next) => {
  var tipoCentr = new tipoCenter();

  (tipoCentr.tipo_centro = req.body.tipo_centro), (tipoCentr.estado = true);

  tipoCentr.save((err, doc) => {
    if (!err)
      res.json({
        titulo: "Operacion exitosa.",
        contenido: "Tipo de centro registrado."
      });
    else {
      if (err.code == 11000)
        res
          .status(422)
          .json({
            titulo: "Operacion nula.",
            contenido: "Tipo de centro introducido ya existe."
          });
      else
        res.json({
          titulo: "Operacion nula.",
          contenido: "Error del servidor."
        });
    }
  });
};

ControladorTipoCentros.UpdateTipoCenter = async (req, res) => {
  const tipoCentro = {
    tipo_centro: req.body.tipo_centro
  };
  await tipoCenter.findByIdAndUpdate(
    req.params.id,
    { $set: tipoCentro },
    { new: true },
    function(err, model) {
      if (!err)
        res.json({
          titulo: "Operacion exitosa.",
          contenido: "Tipo de centro actualizado."
        });
      else {
        if (err.code == 11000)
          res
            .status(422)
            .json({
              titulo: "Operacion nula.",
              contenido: "Tipo de centro introducido ya existe."
            });
        else
          res.json({
            titulo: "Operacion nula.",
            contenido: "Tipo de centro introducido no existe."
          });
      }
    }
  );
};

ControladorTipoCentros.DeleteTipoCenter = async (req, res) => {
  await tipoCenter.findByIdAndRemove(req.params.id, function(err, doc) {
    if (err)
      res
        .status(409)
        .json({
          titulo: "Operacion nula.",
          contenido: "Error del servidor intentar luego"
        });
    else {
      res.json({
        titulo: "Operacion exitosa.",
        contenido: "Tipo de centro eliminado."
      });
    }
  });
};

ControladorTipoCentros.getTipoCenters = async (req, res) => {
  const tipoCenteros = await tipoCenter.find({ estado: true });
  res.json(tipoCenteros);
};

ControladorTipoCentros.getTipoCenter = async (req, res, err) => {
  const tipoCentro = await tipoCenter.findById(
    req.params.id,
    (err, tipoCentro) => {
      if (err)
        return res
          .status(500)
          .json({
            titulo: "Operacion nula.",
            contenido: "Error del servidor."
          });
      if (!tipoCentro) {
        res
          .status(409)
          .json({
            titulo: "Operacion nula.",
            contenido: "Tipo de centro introducido no existe."
          }); //tipoCentro no existe
      }
    }
  );
  res.json(tipoCentro);
};

module.exports = ControladorTipoCentros;
