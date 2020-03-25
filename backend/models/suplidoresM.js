const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.set("useCreateIndex", true);

const modeloSuplidores = new Schema(
  {
    nombre: { type: String, required: true, trim: true, unique: true },
    direccion: { type: String, required: true, trim: true },
    rnc: { type: String, required: true, trim: true, unique: true },
    telefono: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    estado: { type: Boolean, required: true, trim: true }
  },
  { timestamps: true }
);
const ModeloSuplidores = mongoose.model("suplidores", modeloSuplidores);

module.exports = ModeloSuplidores;
