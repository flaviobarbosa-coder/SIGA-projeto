const Quota = require('../models/Quota');
const QuotaPagamento = require('../models/QuotaPagamento');

exports.consultarQuotas = async (req, res) => {
  try {
    const quotas = await Quota.findAll({
      include: [{ model: QuotaPagamento }],
      order: [['data_vencimento', 'DESC']]
    });
    res.render('quotas/lista', { quotas: quotas });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao consultar quotas.');
    res.redirect('/dashboard');
  }
};

exports.formularioPagarQuota = async (req, res) => {
  try {
    const quota = await Quota.findByPk(req.params.id);
    if (!quota) {
      req.flash('error', 'Quota nao encontrada.');
      return res.redirect('/quotas');
    }
    res.render('quotas/pagar', { quota: quota });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao abrir formulario de pagamento.');
    res.redirect('/quotas');
  }
};

exports.submeterPagamento = async (req, res) => {
  try {
    const quotaId = req.body.quotaId;
    const valorPago = req.body.valorPago;
    const metodo = req.body.metodo;

    const quota = await Quota.findByPk(quotaId);
    if (!quota) {
      req.flash('error', 'Quota nao encontrada.');
      return res.redirect('/quotas');
    }

    await QuotaPagamento.create({
      quotaId: quotaId,
      valorPago: valorPago,
      metodo: metodo,
      estado: 'submetido'
    });

    req.flash('success', 'Pagamento submetido com sucesso! Aguarda confirmacao.');
    res.redirect('/quotas');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao submeter pagamento.');
    res.redirect('/quotas');
  }
};

exports.listarPagamentosPendentes = async (req, res) => {
  try {
    const pagamentos = await QuotaPagamento.findAll({
      where: { estado: 'submetido' },
      include: [{ model: Quota }],
      order: [['dataSubmissao', 'ASC']]
    });
    res.render('quotas/pendentes', { pagamentos: pagamentos });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao listar pagamentos pendentes.');
    res.redirect('/dashboard');
  }
};

exports.confirmarPagamento = async (req, res) => {
  try {
    const pagamento = await QuotaPagamento.findByPk(req.params.id, { include: [Quota] });
    if (!pagamento) {
      req.flash('error', 'Pagamento nao encontrado.');
      return res.redirect('/quotas/pendentes');
    }

    pagamento.estado = 'confirmado';
    await pagamento.save();

    pagamento.Quota.estado = 'pago';
    pagamento.Quota.data_pagamento = new Date();
    await pagamento.Quota.save();

    req.flash('success', 'Pagamento confirmado e quota atualizada.');
    res.redirect('/quotas/pendentes');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao confirmar pagamento.');
    res.redirect('/quotas/pendentes');
  }
};

exports.rejeitarPagamento = async (req, res) => {
  try {
    const motivo = req.body.motivo;
    const pagamento = await QuotaPagamento.findByPk(req.params.id);
    if (!pagamento) {
      req.flash('error', 'Pagamento nao encontrado.');
      return res.redirect('/quotas/pendentes');
    }

    pagamento.estado = 'rejeitado';
    pagamento.motivoRejeicao = motivo || 'Nao especificado';
    await pagamento.save();

    req.flash('success', 'Pagamento rejeitado.');
    res.redirect('/quotas/pendentes');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao rejeitar pagamento.');
    res.redirect('/quotas/pendentes');
  }
};