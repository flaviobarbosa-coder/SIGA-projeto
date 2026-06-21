const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Associado = sequelize.define('Associado', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  utilizador_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('fisica', 'juridica'),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  telefone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  nif: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  morada: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  estado: {
    type: DataTypes.ENUM('rascunho','submetida','em_analise','aprovada','rejeitada','activo'),
    defaultValue: 'rascunho'
  }
}, {
  tableName: 'associados',
  timestamps: true,
  createdAt: 'data_criacao',
  updatedAt: false
});

module.exports = Associado;