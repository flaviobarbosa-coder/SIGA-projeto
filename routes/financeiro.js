const express = require('express');
const router = express.Router();
const financeiroController = require('../controllers/financeiroController');

router.get('/', financeiroController.index);
router.get('/pagamentos', financeiroController.listarPagamentos);
router.get('/recibos', financeiroController.listarRecibos);
router.get('/relatorios', financeiroController.relatorio);
router.get('/pagamentos/criar', financeiroController.mostrarCriarPagamento);
router.post('/pagamentos/criar', financeiroController.criarPagamento);

module.exports = router;
