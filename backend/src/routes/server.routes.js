const express = require('express');
const router = express.Router();


const gasto=require('../controllers/gastos.controllers');
const usuario=require('../controllers/usuarios.controllers');
const usuariosRoutes = require('./usuarios.routes');
const verificarToken = require('../middleware/auth');

router.get('/misitio/gastos', verificarToken, gasto.getGastos);
router.post('/misitio/gastos', verificarToken, gasto.addGasto);
router.get('/misitio/gastos/:id', verificarToken, gasto.getGasto);
router.put('/misitio/gastos/:id', verificarToken, gasto.editGasto);
router.put('/misitio/gastos/:id/descripcion', verificarToken, gasto.actualizarDescripcion);
router.delete('/misitio/gastos/:id', verificarToken, gasto.eliminarGasto);

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

router.use((req, res) => {
  res.status(404).send('No se encuentra la página');
});


 module.exports=router;