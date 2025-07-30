const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Simulación de base de datos
let gastos = [
  { id: 1, categoria: 'Salud', monto: 14575.60, descripcion: 'Consultas médicas y medicinas' },
  { id: 2, categoria: 'Alimentación', monto: 25000.00, descripcion: 'Supermercado y restaurantes' },
  { id: 3, categoria: 'Transporte', monto: 12000.00, descripcion: 'Combustible y transporte público' },
];

app.get('/', (req, res) => {
  res.send('Bienvenido al Home del Backend');
});

app.get('/misitio', (req, res) => {
  res.send('Bienvenidos Backend calculadora de gastos')
})

app.get('/misitio/about', (req,res)=>{
 res.send('<h1>Acerca de nosotros</h1>');
})

app.get('/misitio/contacto', (req,res)=>{
 res.sendFile('./contacto.jpg',{
 root:__dirname
    })
})

// Listar todos los gastos
app.get('/misitio/gastos', (req, res) => {
  res.json(gastos);
});

// Registrar un nuevo gasto
app.post('/misitio/gastos', (req, res) => {
  const nuevoGasto = { id: gastos.length + 1, ...req.body };
  gastos.push(nuevoGasto);
  res.status(201).json(nuevoGasto);
});

// Actualizar un gasto existente
app.put('/misitio/gastos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = gastos.findIndex(g => g.id === id);
  if (index !== -1) {
    gastos[index] = { id, ...req.body };
    res.json(gastos[index]);
  } else {
    res.status(404).send('Gasto no encontrado');
  }
});

// Eliminar un gasto
app.delete('/misitio/gastos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = gastos.findIndex(g => g.id === id);
  if (index !== -1) {
    gastos.splice(index, 1);
    res.send(`Gasto con ID ${id} eliminado exitosamente`);
  } else {
    res.status(404).send('Gasto no encontrado');
  }
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
