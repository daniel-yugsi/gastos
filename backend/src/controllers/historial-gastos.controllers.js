const HistorialGasto = require('../models/historial.-gastos');

// Crear historial de gasto
exports.crearHistorial = async (req, res) => {
  try {
    const nuevoHistorial = new HistorialGasto(req.body);
    await nuevoHistorial.save();
    res.status(201).json(nuevoHistorial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todos los historiales
exports.listarHistoriales = async (req, res) => {
  try {
    const historiales = await HistorialGasto.find();
    res.json(historiales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener historial por ID
exports.obtenerHistorial = async (req, res) => {
  try {
    const historial = await HistorialGasto.findById(req.params.id);
    if (!historial) return res.status(404).json({ error: 'No encontrado' });
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar historial
exports.actualizarHistorial = async (req, res) => {
  try {
    const historial = await HistorialGasto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!historial) return res.status(404).json({ error: 'No encontrado' });
    res.json(historial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar historial
exports.eliminarHistorial = async (req, res) => {
  try {
    const historial = await HistorialGasto.findByIdAndDelete(req.params.id);
    if (!historial) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Historial eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};