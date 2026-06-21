const express = require('express');
const router = express.Router();

// TESTE SIMPLES (SEM CONTROLLER)
router.get('/', (req, res) => {
  res.send('USERS ROUTE FUNCIONA PERFEITAMENTE');
});

module.exports = router;