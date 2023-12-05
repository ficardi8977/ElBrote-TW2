const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  clasificacion: {
    type: String,
  },
});

const Producto = mongoose.model("Productos", productoSchema);

module.exports = Producto;
