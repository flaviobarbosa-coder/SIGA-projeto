const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pagamento = sequelize.define('pagamentos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  associado_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  tipo_pagamento: {
    type: DataTypes.ENUM('quota', 'inscricao', 'outro'),
    allowNull: false
  },
  valor: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  data_pagamento: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  estado: {
    type: DataTypes.ENUM('pago', 'pendente', 'cancelado'),
    defaultValue: 'pago'
  }
}, { timestamps: false });

module.exports = Pagamento;