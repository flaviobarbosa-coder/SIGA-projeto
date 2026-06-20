const express = require('express');
const router = express.Router();
const sequelize = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const r1 = await sequelize.query('SELECT COUNT(*) as total FROM associados');
    const r2 = await sequelize.query("SELECT COUNT(*) as total FROM quotas WHERE estado = 'pendente'");
    const r3 = await sequelize.query('SELECT COUNT(*) as total FROM atividades');
    const r4 = await sequelize.query("SELECT COUNT(*) as total FROM pagamentos WHERE estado = 'confirmado'");

    res.render('dashboard/index', {
      totalAssociados: r1[0][0].total,
      quotasPendentes: r2[0][0].total,
      totalAtividades: r3[0][0].total,
      totalPagamentos: r4[0][0].total
    });
  } catch (err) {
    res.send('Erro: ' + err.message);
  }
});

module.exports = router;
