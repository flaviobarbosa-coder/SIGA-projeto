const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Utilizador = sequelize.define('utilizadores', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  perfil: {
    type: DataTypes.ENUM('admin','gestor_associados','gestor_financeiro','gestor_atividades','direcao','associado'),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('ativo','inativo','bloqueado'),
    defaultValue: 'ativo'
  },
  tentativas_login: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, { timestamps: false });

module.exports = Utilizador;
