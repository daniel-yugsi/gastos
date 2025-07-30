const mongoose = require('mongoose');

const GastoSchema = new mongoose.Schema({
  categoria: { type: String, required: true },
  monto: { type: Number, required: true },
  descripcion: { type: String },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
});

module.exports = mongoose.model('Gasto', GastoSchema);
