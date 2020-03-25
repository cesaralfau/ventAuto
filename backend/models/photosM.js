const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.set("useCreateIndex", true);

const modeloPhotos = new Schema(
  {
    nombre: { type: String, required: true, trim: true },
    url: { type: String, trim: true },
    uso: { type: String, required: true, trim: true }
    // pertenece: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);
const ModeloPhotos = mongoose.model("fotos", modeloPhotos);

module.exports = ModeloPhotos;
