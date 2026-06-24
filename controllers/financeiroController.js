const Pagamento = require('../models/Pagamento');
const Recibo = require('../models/Recibo');

exports.index = (req, res) => {
    res.render('financeiro/index');
};

exports.listarPagamentos = async (req, res) => {
    try {
        const pagamentos = await Pagamento.findAll({ order: [['id', 'DESC']] });
        res.render('financeiro/pagamentos', { pagamentos });
    } catch (error) {
        console.error(error);
        res.send('Erro ao listar pagamentos: ' + error.message);
    }
};

exports.listarRecibos = async (req, res) => {
    try {
        const recibos = await Recibo.findAll({ order: [['id', 'DESC']] });
        res.render('financeiro/recibos', { recibos });
    } catch (error) {
        console.error(error);
        res.send('Erro ao listar recibos: ' + error.message);
    }
};

exports.mostrarCriarPagamento = (req, res) => {
    res.render('financeiro/criar-pagamento');
};

exports.criarPagamento = async (req, res) => {
    try {
        const pagamento = await Pagamento.create({
            associado_id: req.body.associado_id,
            tipo_pagamento: req.body.tipo_pagamento,
            valor: req.body.valor,
            estado: 'pago'
        });

        const numeroRecibo = 'REC-' + Date.now();
        await Recibo.create({
            pagamento_id: pagamento.id,
            numero_recibo: numeroRecibo,
            valor: pagamento.valor
        });

        res.redirect('/financeiro/pagamentos');
    } catch (error) {
        console.error(error);
        res.send('Erro ao criar pagamento: ' + error.message);
    }
};

exports.relatorio = async (req, res) => {
    try {
        const pagamentos = await Pagamento.findAll();
        const recibos = await Recibo.findAll();
        const valorTotal = pagamentos.reduce((soma, p) => soma + parseFloat(p.valor), 0);

        res.render('financeiro/relatorios', {
            totalPagamentos: pagamentos.length,
            totalRecibos: recibos.length,
            valorTotal: valorTotal.toFixed(2)
        });
    } catch (error) {
        console.error(error);
        res.send('Erro ao gerar relatorio: ' + error.message);
    }
};
