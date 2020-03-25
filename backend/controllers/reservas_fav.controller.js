const mongoose = require("mongoose");
const passport = require("passport");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

const Item = require("../models/reservas_favM ");

const Controlador = {};

Controlador.register = (req, res, next) => {
  var item = new Item();


  (item.usuario = req.body.usuario),
    (item.oferta = req.body.oferta),

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
      path: "oferta"
    })

    .then(item => {
      return res.json(item);
    })
    .catch(err => {
      return res.status(500).send("Error del Servidor!");
    });
};
Controlador.getReservasByUserAndOfert = async (req, res) => {
  await Item.find({ usuario: req.params.usuario, oferta: req.params.oferta })
    .populate({
      path: "usuario"
    })
    .populate({
      path: "oferta"
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
      path: "oferta"
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
      path: "oferta"
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
      path: "oferta"
    })
    .then(item => {
      return res.json(item);
    })
    .catch(err => {
      return res.status(500).send("Error del Servidor!");
    });
};




Controlador.getAllReservaByUser = async (req, res, err) => {
  await Item.find({ usuario: req.params.usuario })
    .populate({
      path: "usuario"
    })
    .populate({
      path: "oferta"
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
    oferta: req.body.oferta
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
