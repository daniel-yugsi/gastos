const express = require('express')
const app = express()
const port = 3000

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



app.get('/misitio/gastos', (req,res)=>{
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
});

app.post('/misitio/gastos', (req, res) => {
  res.send('Gasto agregado exitosamente');
});

app.put('/misitio/gastos/:id', (req, res) => {
  const id = req.params.id;
  res.send(`Gasto con ID ${id} actualizado exitosamente`);
});

app.delete('/misitio/gastos/:id', (req, res) => {
  const id = req.params.id;
  res.send(`Gasto con ID ${id} eliminado exitosamente`);
});

app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

app.listen(port, () => {
  console.log
  (`Example app listening on port ${port}`)
})
