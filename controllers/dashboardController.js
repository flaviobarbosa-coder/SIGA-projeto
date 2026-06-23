const Utilizador = require('../models/Utilizador');

exports.index = async (req, res) => {
  try {
    const totalUtilizadores = await Utilizador.count();

    res.render('dashboard/index', {
      totalAssociados: 0,
      totalQuotas: 0,
      totalAtividades: 0,
      totalUtilizadores
    });
  } catch (err) {
    console.error('Erro no dashboard:', err.message);
    res.send('Erro ao carregar dashboard');
  }
};