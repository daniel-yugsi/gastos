const mongoose = require('mongoose');

const historialGastoSchema = new mongoose.Schema({
  tipo: { type: String, required: true },
  monto: { type: Number, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HistorialGasto', historialGastoSchema);
