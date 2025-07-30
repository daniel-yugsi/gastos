const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const SECRET_KEY = 'tu_clave_secreta';
const usuariosControllers = {};

// Obtener perfil del usuario autenticado
usuariosControllers.perfil = async (req, res) => {
  try {
    const auth = req.headers['authorization'];
    if (!auth) return res.status(401).json({ error: 'No autorizado' });
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    const usuario = await Usuario.findById(decoded.id).select('nombre email');
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
};

usuariosControllers.getUsuarios = async (req, res) => {
    res.json( [
 {
 gasto:'Salud',
 monto:14575.60,
 informacion:'Corresponde a consultas médicas, pagos de seguros, medicinas'
 },
 
 { 
    gasto:'Alimentación',
    monto: 25000.00,
    informacion:'Incluye compras de supermercado, restaurantes y comida para llevar'
 },
 {
        gasto:'Transporte',
        monto: 12000.00,
        informacion:'Gastos en transporte público, taxis y combustibles'
} ,
{ 
        gasto:'Entretenimiento',
        monto: 8000.00,
        informacion:'Gastos en actividades recreativas, cine, eventos y suscripciones'
}
    ])
};

//metodo POST para agregar un nuevo usuario 

usuariosControllers.addUsuarios = (req, res) => {
    console.log(req.body);
    res.send('Usuario agregado exitosamente'); 
}   

usuariosControllers.registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = new Usuario({ nombre, email, password: hashedPassword });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

usuariosControllers.iniciarSesion = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const esValido = await bcrypt.compare(password, usuario.password);
    if (!esValido) return res.status(401).json({ error: 'Credenciales incorrectas' });

    const token = jwt.sign({ id: usuario._id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

// Obtener perfil del usuario autenticado
usuariosControllers.perfil = async (req, res) => {
  try {
    const auth = req.headers['authorization'];
    if (!auth) return res.status(401).json({ error: 'No autorizado' });
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    const usuario = await Usuario.findById(decoded.id).select('nombre email');
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
};

// Exportar el objeto usuariosControllers
module.exports = usuariosControllers;