const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.set("useCreateIndex", true);
// var centros = mongoose.model('centros');
// var suplidores = mongoose.model('suplidores');

const modeloCentros = new Schema(
  {
    nombre: { type: String, trim: true },
    centro: { type: String, ref: "centros", required: true, trim: true },
    suplidor: { type: String, ref: "suplidores", required: true, trim: true },
    precio: { type: Number, required: true, trim: true },
    moneda: { type: String, required: true, trim: true },
    fecha_inicio: { type: Date, required: true, trim: true },
    fecha_fin: { type: Date, required: true, trim: true },
    fecha_reserva: { type: Date, required: true, trim: true },
    estado: { type: Boolean, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true },
    imagen: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);
const ModeloCentros = mongoose.model("ofertas", modeloCentros);

module.exports = ModeloCentros;
