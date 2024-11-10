const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).send({ message: 'Acceso denegado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(401).send({ message: 'Token inválido' });

    try {
      const user = await User.findById(decoded.id);
      req.user = user; 
      next();
    } catch (error) {
      res.status(500).send({ message: 'Error al obtener el usuario' });
    }
  });
};

module.exports = authenticateToken;
