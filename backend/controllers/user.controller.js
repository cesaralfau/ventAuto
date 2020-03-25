const mongoose = require("mongoose");
const passport = require("passport");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

const User = mongoose.model("usuarios");

const ControladorUsuario = {};

ControladorUsuario.register = (req, res, next) => {
  var user = new User();

  (user.nombre = req.body.nombre),
    (user.apellido = req.body.apellido),
    (user.usuario = req.body.usuario),
    (user.identificacion = req.body.identificacion),
    (user.redes_sociales = req.body.redes_sociales),
    (user.fotoPerfil = req.body.fotoPerfil),
    (user.telefono = req.body.telefono),
    (user.email = req.body.email),
    (user.fechaN = req.body.fechaN),
    (user.password = req.body.password),
    (user.estado = true),
    (user.tipo_usuario = "U"),
    user.save((err, doc) => {
      if (!err)
        res.json({
          titulo: "Operacion exitosa.",
          contenido: "Usuario registrado."
        });
      else {
        if (err.code == 11000)
          res.status(422).json({
            titulo: "Operacion nula.",
            contenido: "Usuario introducido ya existe."
          });
        else
          res.json({
            titulo: "Operacion nula.",
            contenido: "Error del servidor."
          });
      }
    });
};

ControladorUsuario.authenticate = (req, res, next) => {
  // call for passport authentication
  passport.authenticate("local", (err, user, info) => {
    // error from passport middleware
    if (err) return res.status(400).json(err);
    // registered user
    else if (user) return res.status(200).json({ token: user.generateJwt() });
    // unknown user or wrong password
    else return res.status(404).json(info);
  })(req, res);
};

ControladorUsuario.userProfile = (req, res, next) => {
  User.findOne({ _id: req._id }, (err, user) => {
    if (!user)
      return res
        .status(404)
        .json({ status: false, message: "Usuario no existe" });
    else
      return res
        .status(200)
        .json({ status: true, user: _.pick(user, ["tipo_usuario", "_id"]) });
  });
};

ControladorUsuario.getUsers = async (req, res) => {
  const usuarios = await User.find({ estado: true });
  res.json(usuarios);
};

ControladorUsuario.getUser = async (req, res, err) => {
  const usuario = await User.findById(req.params.id, (err, user) => {
    if (err) return res.status(500).send("Error del Servidor!");
    if (!user) {
      res.status(409).json({ mensaje: "usuario no existe" }); //usuario no existe
    }
  });
  res.json(usuario);
};

ControladorUsuario.CountUsers = async (req, res) => {
  const usuarios = await User.find({ estado: true }).count();
  res.json(usuarios);
};

ControladorUsuario.UpdatePass = async (req, res) => {
  const usuario = {
    password: req.body.password,
    saltSecret: String
  };
  bcrypt.genSalt(10, async (err, salt) => {
    bcrypt.hash(usuario.password, salt, async (err, hash) => {
      usuario.password = hash;
      usuario.saltSecret = salt;

      await User.findByIdAndUpdate(
        req.params.id,
        { $set: usuario },
        { new: true },
        function(err, model) {
          if (!err)
            res.json({
              titulo: "Operacion exitosa.",
              contenido: "Contraseña actualizada."
            });
          else {
            res.json({
              titulo: "Operacion nula.",
              contenido: "Error del servidor intente luego."
            });
          }
        }
      );
    });
  });
};

ControladorUsuario.UpdateUser = async (req, res) => {
  const usuario = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    usuario: req.body.usuario,
    fotoPerfil: req.body.fotoPerfil,
    telefono: req.body.telefono,
    nacionalidad: req.body.nacionalidad,
    email: req.body.email,
    fechaN: req.body.fechaN,
    identificacion: req.body.identificacion,
    redes_sociales: req.body.redes_sociales,
    // contrasena: bcrypt.hashSync(req.body.contrasena),
    tipo_usuario: req.body.tipo_usuario
  };
  await User.findByIdAndUpdate(
    req.params.id,
    { $set: usuario },
    { new: true },
    function(err, model) {
      if (!err)
        res.json({
          titulo: "Operacion exitosa.",
          contenido: "Usuario actualizado.",
          item: model
        });
      else {
        if (err.code == 11000)
          res.status(422).json({
            titulo: "Operacion nula.",
            contenido: "Usuario introducido ya existe."
          });
        else
          res.json({
            titulo: "Operacion nula.",
            contenido: "Error del servidor intente luego."
          });
      }
    }
  );
};

ControladorUsuario.DeleteUser = async (req, res) => {
  const usuario = {
    estado: false
  };
  await User.findByIdAndUpdate(
    req.params.id,
    { $set: usuario },
    { new: true },
    function(err, model) {
      if (!err)
        res.json({
          titulo: "Operacion exitosa.",
          contenido: "Usuario eliminado."
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

// ControladorUsuario.DeleteUser = async (req, res) => {
//     await User.findByIdAndRemove(req.params.id);
//     res.json({status:'usuario eliminado'});
// }

module.exports = ControladorUsuario;
