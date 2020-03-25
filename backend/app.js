require("./config/config");
require("./config/db");
require("./config/passportConfig");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const morgan = require("morgan");
const path = require("path");

//rutas
const rtsIndex = require("./routes/usuarios.routes");
const rtsPhotos = require("./routes/photos.routes");
const rtsCentros = require("./routes/centros.routes");
const rtsSupli = require("./routes/suplidores.routes");
const rtsTipoCentros = require("./routes/tipoCentros.routes");
const rtsofertas = require("./routes/ofertas.routes");
const rtsreservas = require("./routes/reservas.routes");
const rtsreservas_fav = require("./routes/reservas_fav.routes");

var app = express();

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:4200" }));
app.use(passport.initialize());

app.use("/api/usuarios", rtsIndex);
app.use("/api/photos", rtsPhotos);
app.use("/api/centros", rtsCentros);
app.use("/api/tipoCentros", rtsTipoCentros);
app.use("/api/supli", rtsSupli);
app.use("/api/ofertas", rtsofertas);
app.use("/api/reservas", rtsreservas);
app.use("/api/reservas_fav", rtsreservas_fav);

// error handler
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    var valErrors = [];
    Object.keys(err.errors).forEach(key =>
      valErrors.push(err.errors[key].message)
    );
    res.status(422).send(valErrors);
  } else {
    console.log(err);
  }
});

// start server
app.listen(process.env.PORT, () =>
  console.log(`Server started at port : ${process.env.PORT}`)
);
