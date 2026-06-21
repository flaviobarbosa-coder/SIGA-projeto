const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Recibo = sequelize.define('recibos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pagamento_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  numero_recibo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  valor: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  data_emissao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, { timestamps: false });

module.exports = Recibo;