const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.set("useCreateIndex", true);
// var centros = mongoose.model('centros');
// var suplidores = mongoose.model('suplidores');

const modeloReservas = new Schema(
  {
    cantFav: { type: String, trim: true },
    usuario: { type: String, ref: "usuarios", required: true, trim: true },
    oferta: { type: String, ref: "ofertas", required: true, trim: true },
    centro: { type: String, ref: "centros", trim: true },
    cantidad: { type: Number, required: true, trim: true },
    pago: { type: Boolean, trim: true },
    estado: { type: Boolean, required: true, trim: true },
    fecha_reserva: { type: Date, required: true, trim: true },
    fecha_pago: { type: Date, trim: true },
    fecha_reembolso: { type: Date, trim: true },
    fecha_cancelacion: { type: Date, trim: true },
    fecha_reactivacion: { type: Date, trim: true },
  },
  { timestamps: true }
);
const ModeloReserva = mongoose.model("reservas", modeloReservas);

module.exports = ModeloReserva;
