const Utilizador = require('../models/Utilizador');
const Associado = require('../models/Associado');
const Quota = require('../models/Quota');
const Atividade = require('../models/Atividade');

exports.index = async (req, res) => {
  try {
    const totalUtilizadores = await Utilizador.count();
    const totalAssociados = await Associado.count();
    const quotasPagas = await Quota.count({ where: { estado: 'pago' } });
    const totalAtividades = await Atividade.count();

    res.render('dashboard/index', {
      totalAssociados,
      quotasPagas,
      totalAtividades,
      totalUtilizadores
    });
  } catch (err) {
    console.error(err);
    res.render('dashboard/index', {
      totalAssociados: 0,
      quotasPagas: 0,
      totalAtividades: 0,
      totalUtilizadores: 0
    });
  }
};
