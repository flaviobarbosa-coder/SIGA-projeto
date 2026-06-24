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
  tipo: {
    type: DataTypes.ENUM('quota', 'atividade'),
    allowNull: false,
    defaultValue: 'quota'
  },
  valor: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('pendente', 'confirmado', 'rejeitado'),
    defaultValue: 'pendente'
  },
  data_pagamento: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, { timestamps: false });

module.exports = Pagamento;
