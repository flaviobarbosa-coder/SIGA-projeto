const DataTypes = require('sequelize').DataTypes;
const sequelize = require('../config/database');

const Quota = sequelize.define('Quota', {
  associado_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  periodo: {
    type: DataTypes.ENUM('mensal', 'trimestral', 'anual'),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('pendente', 'pago', 'atrasado'),
    defaultValue: 'pendente'
  },
  data_vencimento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  data_pagamento: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
}, {
  tableName: 'quotas',
  timestamps: false
});

module.exports = Quota;