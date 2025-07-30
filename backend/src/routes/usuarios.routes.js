const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controllers');


router.post('/registro', usuariosController.registrarUsuario);
router.post('/login', usuariosController.iniciarSesion);
router.get('/perfil', usuariosController.perfil);

module.exports = router;
