const express = require('express');
const router = express.Router();


const gasto=require('../controllers/gastos.controllers');
const usuario=require('../controllers/usuarios.controllers');

router.get('/misitio/gastos',gasto.getGastos);
router.post('/misitio/gastos',gasto.addGasto);
router.get('/misitio/gastos/:id',gasto.getGasto);
router.put('/misitio/gastos/:id',gasto.editGasto);

router.get('/misitio/usuarios',usuario.getUsuarios);
router.post('/misitio/usuarios',usuario.addUsuarios);

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