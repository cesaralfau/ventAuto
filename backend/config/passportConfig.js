const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

var User = mongoose.model("usuarios");

passport.use(
  new localStrategy(
    { usernameField: "usuario" },
    (username, password, done) => {
      User.findOne({ usuario: username }, (err, user) => {
        if (err) return done(err);
        // unknown user
        else if (!user)
          return done(null, false, {
            mensaje: "El usuario introducido no existe"
          });
        // wrong password
        else if (!user.verifyPassword(password))
          return done(null, false, { mensaje: "Contraseña incorrecta" });
        // authentication succeeded
        else return done(null, user);
      });
    }
  )
);
