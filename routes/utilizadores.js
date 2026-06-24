const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/utilizadoresController');

router.get('/', ctrl.listar);

router.get('/criar', ctrl.mostrarCriar);
router.post('/criar', ctrl.criar);

router.get('/editar/:id', ctrl.mostrarEditar);
router.post('/editar/:id', ctrl.editar);

router.get('/eliminar/:id', ctrl.eliminar);

router.get('/recuperar-password', ctrl.mostrarRecuperarPassword);
router.post('/recuperar-password', ctrl.recuperarPassword);

router.get('/log-auditoria', ctrl.logAuditoria);

// TESTE
router.get('/teste', (req, res) => {
  res.send('ROTA TESTE OK');
});

module.exports = router;