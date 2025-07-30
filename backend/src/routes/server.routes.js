const express = require('express');
const router = express.Router();


const gasto=require('../controllers/gastos.controllers');
const usuario=require('../controllers/usuarios.controllers');
const usuariosRoutes = require('./usuarios.routes');
const verificarToken = require('../middleware/auth');
const historialGasto = require('../controllers/historial-gastos.controllers');

// Rutas públicas para gastos
router.get('/misitio/gastos', gasto.getGastos);
router.post('/misitio/gastos', gasto.addGasto);
router.get('/misitio/gastos/:id', gasto.getGasto);
router.put('/misitio/gastos/:id', gasto.editGasto);
router.put('/misitio/gastos/:id/descripcion', gasto.actualizarDescripcion);
router.delete('/misitio/gastos/:id', gasto.eliminarGasto);

router.use('/misitio/usuarios', usuariosRoutes);

router.get('/misitio', (req, res) => {
  res.send('Bienvenido al Calculo de Gasto');
});

router.get('/misitio/about', (req, res) => {
  res.send('Acerca de nosotros');
});


router.get('/misitio/contacto', (req, res) => {
  res.sendFile('./a.png', {
    root: __dirname
  });
});

// Rutas públicas para historial de gastos
router.post('/misitio/historial', historialGasto.crearHistorial);
router.get('/misitio/historial', historialGasto.listarHistoriales);
router.get('/misitio/historial/:id', historialGasto.obtenerHistorial);
router.put('/misitio/historial/:id', historialGasto.actualizarHistorial);
router.delete('/misitio/historial/:id', historialGasto.eliminarHistorial);

router.use((req, res) => {
  res.status(404).send('No se encuentra la página');
});


 module.exports=router;