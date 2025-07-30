const Gasto = require('../models/gastos');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'tu_clave_secreta';
const gastosController = {};

// Middleware para extraer el usuario del token
function getUserIdFromRequest(req) {
  const auth = req.headers['authorization'];
  if (!auth) return null;
  try {
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded.id;
  } catch {
    return null;
  }
}

// Obtener historial de gastos del usuario autenticado
gastosController.getGastos = async (req, res) => {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) return res.status(401).json({ error: 'No autorizado' });
    
    // Optimizar consulta: traer solo campos necesarios y limitar resultados
    const gastos = await Gasto.find(
      { usuario: userId },
      {
        categoria: 1,
        monto: 1,
        descripcion: 1,
        mes: 1,
        anio: 1,
        usuario: 1
      }
    )
    .sort({ _id: -1 })
    .limit(20)
    .lean()
    .populate('usuario', 'nombre')
    .exec();

    res.json(gastos);
  } catch (error) {
    console.error('Error al obtener gastos:', error);
    res.status(500).json({ mensaje: 'Error al obtener gastos' });
  }
};

// Actualizar descripción de gasto
gastosController.actualizarDescripcion = async (req, res) => {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) return res.status(401).json({ error: 'No autorizado' });
    
    const { gastoId, nuevaDescripcion } = req.body;
    if (!gastoId || !nuevaDescripcion) {
      return res.status(400).json({ error: 'Falta el ID del gasto o la nueva descripción' });
    }

    // Verificar que el gasto pertenece al usuario
    const gasto = await Gasto.findOne({ _id: gastoId, usuario: userId });
    if (!gasto) {
      return res.status(404).json({ error: 'Gasto no encontrado o no autorizado' });
    }

    // Actualizar la descripción
    const gastoActualizado = await Gasto.findByIdAndUpdate(
      gastoId,
      { descripcion: nuevaDescripcion },
      { new: true, runValidators: true }
    );

    res.json(gastoActualizado);
  } catch (error) {
    console.error('Error al actualizar descripción:', error);
    res.status(500).json({ error: 'Error al actualizar la descripción' });
  }
};

// Eliminar un gasto
gastosController.eliminarGasto = async (req, res) => {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) return res.status(401).json({ error: 'No autorizado' });
    
    const gastoId = req.params.id;
    if (!gastoId) {
      return res.status(400).json({ error: 'Falta el ID del gasto' });
    }

    // Verificar que el gasto pertenece al usuario
    const gasto = await Gasto.findOne({ _id: gastoId, usuario: userId });
    if (!gasto) {
      return res.status(404).json({ error: 'Gasto no encontrado o no autorizado' });
    }

    // Eliminar el gasto
    await Gasto.findByIdAndDelete(gastoId);
    res.json({ mensaje: 'Gasto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar gasto:', error);
    res.status(500).json({ error: 'Error al eliminar el gasto' });
  }
};

// Guardar gastos del usuario autenticado
gastosController.addGasto = async (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) return res.status(401).json({ error: 'No autorizado' });
  try {
    const { categoria, monto, descripcion, mes, anio } = req.body;
    console.log('Intentando guardar gasto para usuario:', userId);
    console.log('Datos recibidos:', req.body);
    const gasto = new Gasto({
      categoria,
      monto,
      descripcion,
      usuario: userId,
      mes,
      anio
    });
    await gasto.save();
    console.log('Gasto guardado:', gasto);
    res.json({ status: 'Gasto guardado', gasto });
  } catch (err) {
    console.error('Error al guardar gasto:', err);
    res.status(500).json({ error: 'Error al guardar gasto' });
  }
};

// Obtener un gasto específico (opcional)
gastosController.getGasto = async (req, res) => {
  const gasto = await Gasto.findById(req.params.id);
  res.json(gasto);
};

// Editar un gasto (opcional)
gastosController.editGasto = async (req, res) => {
  const { id } = req.params;
  const gasto = {
    categoria: req.body.categoria,
    monto: req.body.monto,
    descripcion: req.body.descripcion,
    mes: req.body.mes,
    anio: req.body.anio
  };
  await Gasto.findByIdAndUpdate(id, { $set: gasto }, { new: true });
  res.json('status: Gasto actualizado');
};

module.exports = gastosController;