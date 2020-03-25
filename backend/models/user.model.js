const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var userSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    identificacion: { type: Object, required: false, trim: true },
    usuario: { type: String, required: true, trim: true, unique: true },
    telefono: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    fechaN: { type: Date, required: true, trim: true },
    redes_sociales: { type: Object, required: false, trim: true },
    nacionalidad: { type: String, required: false, trim: true },
    password: { type: String, required: true, trim: true },
    estado: { type: Boolean, required: true, trim: true },
    tipo_usuario: { type: String, required: true, trim: true },
    fotoPerfil: { type: String, trim: true },
    saltSecret: String
  },
  { timestamps: true }
);

// Events
userSchema.pre("save", function(next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.saltSecret = salt;
      next();
    });
  });
});

userSchema.pre("findByIdAndUpdate", function(next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.saltSecret = salt;
      next();
    });
  });
});

// Methods
userSchema.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function() {
  return jwt.sign(
    { _id: this._id, tipo_usuario: this.tipo_usuario },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXP
    }
  );
};

mongoose.model("usuarios", userSchema);
