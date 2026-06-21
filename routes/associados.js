const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/associadosController');

// Formulário de candidatura
router.get('/formulario', ctrl.formulario);

// Submeter candidatura
router.post('/submeter', ctrl.submeter);

// Listar associados
router.get('/lista', ctrl.listar);

// Ver detalhes de um associado
router.get('/detalhes/:id', ctrl.detalhes);

// Aprovar candidatura
router.post('/aprovar/:id', ctrl.aprovar);

// Rejeitar candidatura
router.post('/rejeitar/:id', ctrl.rejeitar);

module.exports = router;