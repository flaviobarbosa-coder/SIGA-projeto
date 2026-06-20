const sequelize = require('../config/database');

exports.mostrarDashboard = async (req, res) => {
  try {
    const r1 = await sequelize.query('SELECT COUNT(*) as total FROM associados');
    const r2 = await sequelize.query("SELECT COUNT(*) as total FROM quotas WHERE estado = 'pendente'");
    const r3 = await sequelize.query('SELECT COUNT(*) as total FROM atividades');
    const r4 = await sequelize.query("SELECT COUNT(*) as total FROM pagamentos WHERE estado = 'confirmado'");

    const dados = {
      totalAssociados: r1[0][0].total,
      quotasPendentes: r2[0][0].total,
      totalAtividades: r3[0][0].total,
      totalPagamentos: r4[0][0].total
    };

    console.log('Dados dashboard:', dados);
    res.render('dashboard/index', dados);
  } catch (err) {
    console.error('Erro:', err.message);
    res.send('Erro: ' + err.message);
  }
};
