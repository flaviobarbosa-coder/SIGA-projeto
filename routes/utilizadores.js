const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/utilizadoresController');

router.get('/', ctrl.listar);
router.get('/criar', ctrl.mostrarCriar);
router.post('/criar', ctrl.criar);
router.get('/editar/:id', ctrl.mostrarEditar);
router.post('/editar/:id', ctrl.editar);
router.get('/eliminar/:id', ctrl.eliminar);

module.exports = router;
