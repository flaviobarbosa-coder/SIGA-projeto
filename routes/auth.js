const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.mostrarLogin);

router.post('/login', (req, res, next) => {
  console.log('POST /auth/login recebido!');
  console.log('Body:', req.body);
  next();
}, authController.fazerLogin);

router.get('/logout', authController.fazerLogout);

module.exports = router;