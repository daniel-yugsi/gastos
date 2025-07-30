const express = require('express')
const app = express()
const port = 3000
const morgan=require('morgan'); 

// Middleware para manejar el cuerpo de las solicitudes

// Primero conectamos a la base de datos
require('./src/database').then(() => {
    console.log('Database connection ready');
}).catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
});

app.use(morgan('dev'));

// Configurar CORS para permitir peticiones desde el frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.static('public')); // Servir archivos estáticos desde la carpeta 'public' 
    
// Middleware para manejar el cuerpo de las solicitudes
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas  

app.use(require('./src/routes/server.routes'));

function logger(req,res,next){
 console.log('Ruta Recibida '+ req.protocol+'://'+req.get('host')+ req.originalUrl);
 next();
}

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});