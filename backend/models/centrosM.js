const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.set("useCreateIndex", true);

const modeloCentros = new Schema(
  {
    tipo_centro: { type: String, required: true, trim: true },
    nombre: { type: String, required: true, trim: true, unique: true },
    direccion: { type: String, required: true, trim: true },
    rnc: { type: String, required: true, trim: true, unique: true },
    telefono: { type: String, required: true, trim: true },
    pais: { type: Object, required: true, trim: true },
    redes_sociales: { type: Object, required: false, trim: true },
    comentario: { type: String, trim: true },
    estado: { type: Boolean, required: false, trim: true }
  },
  { timestamps: true }
);
const ModeloCentros = mongoose.model("centros", modeloCentros);

module.exports = ModeloCentros;
