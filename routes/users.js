const express = require('express');
const authenticateToken = require('../middlewares/auth');
const User = require('../models/User');

const router = express.Router();

router.get('/profile', authenticateToken, (req, res) => {
  res.json({ username: req.user.username });  
});

module.exports = router;
