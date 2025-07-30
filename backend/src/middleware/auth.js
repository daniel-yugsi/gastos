const jwt = require('jsonwebtoken');
const SECRET_KEY = 'tu_clave_secreta';

const verificarToken = (req, res, next) => {
  const auth = req.headers['authorization'];
  if (!auth) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = verificarToken;
