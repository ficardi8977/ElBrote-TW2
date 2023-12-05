const mongoose = require("mongoose");

const compraSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  fechaCompra: {
    type: Date,
    default: Date.now,
  },
  listado: [
    {
      imageUrl: String,
      descripcion: String,
      cantidad: Number,
      precioUnitario: Number,
    },
  ],
  precioTotal: {
    type: Number,
    required: true,
  },
});

const Compra = mongoose.model("Compras", compraSchema);

module.exports = Compra;
