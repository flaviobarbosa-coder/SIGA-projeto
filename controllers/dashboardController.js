const Utilizador = require('../models/Utilizador');

exports.index = async (req, res) => {
  try {
    const totalUtilizadores = await Utilizador.count();
    res.render('dashboard/index', {
      totalAssociados: 0,
      quotasPagas: 0,
      totalAtividades: 0,
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