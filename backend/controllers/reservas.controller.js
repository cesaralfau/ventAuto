const mongoose = require("mongoose");
const passport = require("passport");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

const Item = require("../models/reservasM");

const Controlador = {};

Controlador.register = (req, res, next) => {
  var item = new Item();


  (item.usuario = req.body.usuario),
    (item.oferta = req.body.oferta),
    (item.cantidad = req.body.cantidad),
    (item.cantFav = req.body.cantFav),
    (item.fecha_reserva = req.body.fecha_reserva),
    (item.centro = req.body.centro),
    (item.pago = req.body.pago),
    (item.fecha_pago = req.body.fecha_pago),
    (item.fecha_reembolso = req.body.fecha_reembolso),
    (item.fecha_cancelacion = req.body.fecha_cancelacion),
    (item.fecha_reactivacion = req.body.fecha_reactivacion),
    (item.estado = true);

  item.save((err, doc) => {
    if (!err)
      res.json({
        titulo: "Operacion exitosa.",
        contenido: "Item registrado.",
        body: doc
      });
    else {
      if (err.code == 11000)
        res.status(422).json({
          titulo: "Operacion nula.",
          contenido: "Item introducida ya existe."
        });
      else
        res.json({
          titulo: "Operacion nula.",
          contenido: "Error del servidor."
        });
    }
  });
};

Controlador.getAllReservas = async (req, res) => {
  await Item.find()
    .populate({
      path: "usuario"
    })
    .populate({
      path: "centro"
    })
    .populate({
      path: "oferta"
      // select: ["nombre", "direccion"]
    })
    .then(item => {
      return res.json(item);
    })
    .catch(err => {
      return res.status(500).send("Error del Servidor!");
    });
};

Controlador.getReservasActivas = async (req, res) => {
  await Item.find({ estado: true })
    .populate({
      path: "usuario"
    })
    .populate({
      path: "centro"
    })
    .populate({
      path: "oferta"
      // select: ["nombre", "direccion"]
    })
    .then(item => {
      return res.json(item);
    })
    .catch(err => {
      return res.status(500).send("Error del Servidor!");
    });
};

Controlador.getReservasCanceladas = async (req, res) => {
  await Item.find({ estado: false })
    .populate({
      path: "usuario"
    })
    .populate({
      path: "centro"
    })
    .populate({
      path: "oferta"
      // select: ["nombre", "direccion"]
    })
    .then(item => {
      return res.json(item);
    })
    .catch(err => {
      return res.status(500).send("Error del Servidor!");
    });
};

Controlador.getReserva = async (req, res) => {
  await Item.findById({ estado: true })
    .populate({
      path: "usuario"
    })
    .populate({
      path: "centro"
    })
    .populate({
      path: "oferta"
      // select: ["nombre", "direccion"]
    })
    .then(item => {
      return res.json(item);
    })
    .catch(err => {
      return res.status(500).send("Error del Servidor!");
    });
};


Controlador.getReservaByUser = async (req, res, err) => {
  await Item.find({ usuario: req.params.usuario, estado: true })
    .populate({
      path: "usuario"
    })
    .populate({
      path: "oferta"
    })
    .populate({
      path: "centro"
    })
    .then(oferta => {
      return res.json(oferta); //oferta no existe
    })
    .catch(err => {
      return res.status(500).send("Error del Servidor!");
    });
};

Controlador.getReservaByUserCanceladas = async (req, res, err) => {
  await Item.find({ usuario: req.params.usuario, estado: false })
    .populate({
      path: "usuario"
    })
    .populate({
      path: "oferta"
    })
    .populate({
      path: "centro"
    })
    .then(oferta => {
      return res.json(oferta); //oferta no existe
    })
    .catch(err => {
      return res.status(500).send("Error del Servidor!");
    });
};

Controlador.Count = async (req, res) => {
  const item = await Item.find({ estado: true }).count();
  res.json(item);
};

Controlador.UpdateReserva = async (req, res) => {
  const item = {
    usuario: req.body.usuario,
    oferta: req.body.oferta,
    cantFav: req.body.cantFav,
    cantidad: req.body.cantidad,
    fecha_reserva: req.body.fecha_reserva,
    centro: req.body.centro,
    pago: req.body.pago,
    estado: req.body.estado,
    fecha_pago: req.body.fecha_pago,
    fecha_reembolso: req.body.fecha_reembolso,
    fecha_cancelacion: req.body.fecha_cancelacion,
    fecha_reactivacion: req.body.fecha_reactivacion,
  };
  await Item.findByIdAndUpdate(
    req.params.id,
    { $set: item },
    { new: true },
    function (err, model) {
      if (!err)
        res.json({
          titulo: "Operacion exitosa.",
          contenido: "Item actualizada.",
          body: model
        });
      else {
        if (err.code == 11000)
          res.status(422).json({
            titulo: "Operacion nula.",
            contenido: "Item introducida ya existe."
          });
        else
          res.json({
            titulo: "Operacion nula.",
            contenido: "Item introducida no existe."
          });
      }
    }
  );
};

Controlador.DeleteReserva = async (req, res) => {
  await Item.findByIdAndRemove(req.params.id, function (err, doc) {
    if (err)
      res.status(409).json({
        titulo: "Operacion nula.",
        contenido: "Error del servidor intentar luego"
      });
    else {
      res.json({
        titulo: "Operacion exitosa.",
        contenido: "Item eliminada."
      });
    }
  });
};

module.exports = Controlador;
