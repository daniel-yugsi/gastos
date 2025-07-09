const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // Para evitar advertencias de Mongoose


const URI = 'mongodb://atlas-sql-686e85c4fe6c9631cb1a2110-dpgtps.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin';

mongoose.connect(URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

module.exports = mongoose;