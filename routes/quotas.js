const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/quotasController');

// UC: Consultar Quota
router.get('/', ctrl.consultarQuotas);

// UC: Pagar Quota -> abre formulário (include: Consultar Quota)
router.get('/:id/pagar', ctrl.formularioPagarQuota);

// UC: Submeter Pagamento
router.post('/pagamentos', ctrl.submeterPagamento);

// Lista de pendentes (apoio visual à Gestão de Associados)
router.get('/pendentes', ctrl.listarPagamentosPendentes);

// UC: Confirmar Pagamento
router.post('/pagamentos/:id/confirmar', ctrl.confirmarPagamento);

// UC: Rejeitar Pagamento (extends)
router.post('/pagamentos/:id/rejeitar', ctrl.rejeitarPagamento);

module.exports = router;
