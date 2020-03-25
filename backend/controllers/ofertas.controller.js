const mongoose = require("mongoose");
const passport = require("passport");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

const Oferta = require("../models/ofertasM");

const ControladorOfertas = {};

ControladorOfertas.register = (req, res, next) => {
  var ofert = new Oferta();


  (ofert.nombre = req.body.nombre),
    (ofert.centro = req.body.centro),
    (ofert.suplidor = req.body.suplidor),
    (ofert.precio = req.body.precio),
    (ofert.moneda = req.body.moneda),
    (ofert.fecha_inicio = req.body.fecha_inicio),
    (ofert.fecha_fin = req.body.fecha_fin),
    (ofert.descripcion = req.body.descripcion),
    (ofert.fecha_reserva = req.body.fecha_reserva),
    (ofert.imagen = req.body.imagen);
  ofert.estado = true;


  ofert.save((err, doc) => {


    if (!err)
      res.json({
        titulo: "Operacion exitosa.",
        contenido: "Oferta registrada.",
        oferta: doc
      });
    else {
      if (err.code == 11000)
        res.status(422).json({
          titulo: "Operacion nula.",
          contenido: "Oferta introducida ya existe."
        });
      else
        res.json({
          titulo: "Operacion nula.",
          contenido: "Error del servidor."
        });
    }
  });
};

ControladorOfertas.getOfertas = async (req, res) => {
  await Oferta.find({ estado: true })
    .populate({
      path: "centro"
    })
    .populate({
      path: "suplidor",
      select: ["nombre", "direccion"]
    })
    .then(oferta => {
      return res.json(oferta); //oferta no existe
    })
    .catch(err => {
      return res.status(500).send("Error del Servidor!");
    });
};

ControladorOfertas.getOfertasServicios = async (req, res) => {

  await Oferta.find({
    "centro.tipo_centro": "Hotel"
  })

    .populate({
      path: "centro"
    })
    .populate({
      path: "suplidor",
      select: ["nombre", "direccion"]
    })
    .then(oferta => {
      return res.json(oferta);
    })
    .catch(err => {
      return res.status(500).send("Error del Servidor!");
    });
};

ControladorOfertas.getOferta = async (req, res, err) => {
  await Oferta.findById(req.params.id)
    .populate({
      path: "centro"
    })
    .populate({
      path: "suplidor"
    })
    .then(oferta => {
      return res.json(oferta); //oferta no existe
    })
    .catch(err => {
      return res.status(500).send("Error del Servidor!");
    });
};

ControladorOfertas.CountOfertas = async (req, res) => {
  const ofert = await Oferta.find({ estado: true }).count();
  res.json(ofert);
};

ControladorOfertas.UpdateOferta = async (req, res) => {
  const oferta = {
    nombre: req.body.nombre,
    centro: req.body.centro,
    suplidor: req.body.suplidor,
    precio: req.body.precio,
    moneda: req.body.moneda,
    fecha_inicio: req.body.fecha_inicio,
    fecha_fin: req.body.fecha_fin,
    fecha_reserva: req.body.fecha_reserva,
    descripcion: req.body.descripcion,
    imagen: req.body.imagen
  };
  await Oferta.findByIdAndUpdate(
    req.params.id,
    { $set: oferta },
    { new: true },
    function (err, model) {
      if (!err)
        res.json({
          titulo: "Operacion exitosa.",
          contenido: "Oferta actualizada."
        });
      else {
        if (err.code == 11000)
          res.status(422).json({
            titulo: "Operacion nula.",
            contenido: "Oferta introducida ya existe."
          });
        else
          res.json({
            titulo: "Operacion nula.",
            contenido: "Oferta introducida no existe."
          });
      }
    }
  );
};

ControladorOfertas.DeleteOferta = async (req, res) => {
  await Oferta.findByIdAndRemove(req.params.id, function (err, doc) {
    if (err)
      res.status(409).json({
        titulo: "Operacion nula.",
        contenido: "Error del servidor intentar luego"
      });
    else {
      res.json({
        titulo: "Operacion exitosa.",
        contenido: "Oferta eliminada."
      });
    }
  });
};

module.exports = ControladorOfertas;
