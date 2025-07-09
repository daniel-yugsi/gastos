const Gasto = require('../models/gastos'); // Importar el modelo de Gasto
const gastosController = {};  

//metodo GET
gastosController.getGastos= async(req, res)=>
{
const gastos= await Gasto.find();
res.json(gastos);
}
//metodo POST
gastosController.addGasto= async(req,res)=>{
const gasto=new Gasto({
id: req.body.id,
tipo: req.body.tipo,
monto:req.body.monto,
descripcion:req.body.descripcion
});
console.log(gasto);
await gasto.save();
res.json('status: Gasto guardado');
}

gastosController.getGasto=async(req,res)=>{
 console.log(req.params.id);
 const gasto= await Gasto.findById(req.params.id);
 res.json(gasto);
}

gastosController.editGasto=async(req,res)=>{
 const {id}=req.params;
 const gasto={
 tipo: req.body.tipo,
 ruc: req.body.ruc,
 empresa: req.body.empresa,
 monto: req.body.monto
 };
 await Gasto.findByIdAndUpdate(id, {$set:gasto},{new: true});
 res.json('status: Gasto actualizado');
}

module.exports=gastosController;