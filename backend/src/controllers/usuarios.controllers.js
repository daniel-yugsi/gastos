const usuariosControllers = {}; 
const express = require('express');


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
// Exportar el objeto usuariosControllers
module.exports = usuariosControllers;   