const DataTypes = require('sequelize').DataTypes;
const sequelize = require('../config/database');
const Quota = require('./Quota');

const QuotaPagamento = sequelize.define('QuotaPagamento', {
  quotaId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  valorPago: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  metodo: {
    type: DataTypes.ENUM('transferencia', 'mb_way', 'numerario', 'cartao'),
    allowNull: false
  },
  comprovativo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dataSubmissao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  estado: {
    type: DataTypes.ENUM('submetido', 'confirmado', 'rejeitado'),
    defaultValue: 'submetido'
  },
  motivoRejeicao: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'quota_pagamentos',
  timestamps: true
});

Quota.hasMany(QuotaPagamento, { foreignKey: 'quotaId' });
QuotaPagamento.belongsTo(Quota, { foreignKey: 'quotaId' });

module.exports = QuotaPagamento;