const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const URI = 'mongodb+srv://danielyug:leinad2003@cluster0.mqsi2ll.mongodb.net/gastosdb?retryWrites=true&w=majority&appName=Cluster0';

// Export a promise that resolves when the connection is ready
const connectDB = mongoose.connect(URI, {
    socketTimeoutMS: 45000,
    maxPoolSize: 50,
    wtimeoutMS: 2500
}).then(async () => {
    console.log('MongoDB conectado');
    try {
        // Crear índices compuestos para búsquedas más rápidas
        await mongoose.connection.collection('gastos').createIndex({ 
            usuario: 1, 
            mes: -1, 
            anio: -1 
        });
        console.log('Índices creados para optimizar consultas');
        return mongoose; // Return mongoose instance when everything is ready
    } catch (err) {
        console.error('Error al crear índices:', err);
        throw err; // Propagate the error
    }
}).catch(err => {
    console.error('Error de conexión a MongoDB:', err);
    throw err; // Propagate the error
});

module.exports = connectDB;