const mongoose = require('mongoose');   
const Schema = mongoose.Schema; 

const GastoSchema = new Schema({
    tipo: {type: String, required: false},
    monto: {type: Number, required: false},
    descripcion: {type: String, required: false},
});

module.exports = mongoose.model('Gasto', GastoSchema);