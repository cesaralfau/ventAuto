const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.set("useCreateIndex", true);

const modeloTipoCentros = new Schema(
  {
    tipo_centro: { type: String, required: true, trim: true, unique: true },
    estado: { type: Boolean, required: true, trim: true }
  },
  { timestamps: true }
);
const ModeloTipoCentros = mongoose.model("tipoCentros", modeloTipoCentros);

module.exports = ModeloTipoCentros;
