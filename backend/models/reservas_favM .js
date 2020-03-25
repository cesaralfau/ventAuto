const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.set("useCreateIndex", true);
// var centros = mongoose.model('centros');
// var suplidores = mongoose.model('suplidores');

const modeloReservasFav = new Schema(
  {
    usuario: { type: String, ref: "usuarios", required: true, trim: true },
    oferta: { type: String, ref: "ofertas", required: true, trim: true },
  },
  { timestamps: true }
);
const ModeloReservaFav = mongoose.model("reservasFav", modeloReservasFav);

module.exports = ModeloReservaFav;
