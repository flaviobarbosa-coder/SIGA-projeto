const Pagamento = require('../models/Pagamento');
const Recibo = require('../models/Recibo');

exports.index = async (req, res) => {
  try {
    const pagamentos = await Pagamento.findAll({ order: [['id', 'DESC']], limit: 5 });
    const totalReceitas = await Pagamento.sum('valor', { where: { estado: 'confirmado' } }) || 0;
    res.render('financeiro/index', {
      pagamentos,
      totalReceitas,
      totalDespesas: 0,
      saldoAtual: totalReceitas
    });
  } catch (err) {
    res.send('Erro: ' + err.message);
  }
};

exports.listarPagamentos = async (req, res) => {
  try {
    const pagamentos = await Pagamento.findAll({ order: [['id', 'DESC']] });
    res.render('financeiro/pagamentos', { pagamentos });
  } catch (err) {
    res.send('Erro: ' + err.message);
  }
};

exports.listarRecibos = async (req, res) => {
  try {
    const recibos = await Recibo.findAll({ order: [['id', 'DESC']] });
    res.render('financeiro/recibos', { recibos });
  } catch (err) {
    res.send('Erro: ' + err.message);
  }
};

exports.mostrarCriarPagamento = (req, res) => {
  res.render('financeiro/criar-pagamento');
};

exports.criarPagamento = async (req, res) => {
  try {
    const pagamento = await Pagamento.create({
      associado_id: req.body.associado_id,
      tipo: req.body.tipo || 'quota',
      valor: req.body.valor,
      estado: 'confirmado'
    });
    const numeroRecibo = 'REC-' + Date.now();
    await Recibo.create({
      pagamento_id: pagamento.id,
      numero_recibo: numeroRecibo,
      valor: pagamento.valor
    });
    res.redirect('/financeiro/pagamentos');
  } catch (err) {
    res.send('Erro: ' + err.message);
  }
};

exports.relatorio = async (req, res) => {
  try {
    const pagamentos = await Pagamento.findAll();
    const recibos = await Recibo.findAll();
    const valorTotal = pagamentos.reduce((soma, p) => soma + parseFloat(p.valor || 0), 0);
    res.render('financeiro/relatorios', {
      totalPagamentos: pagamentos.length,
      totalRecibos: recibos.length,
      valorTotal: valorTotal.toFixed(2)
    });
  } catch (err) {
    res.send('Erro: ' + err.message);
  }
};
