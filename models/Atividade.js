const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Atividade = sequelize.define("atividades", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM("conferencia","workshop","formacao","transferencia"),
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  vagas: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  estado: {
    type: DataTypes.ENUM("programada","em_curso","concluida"),
    defaultValue: "programada"
  }
}, { timestamps: false });

module.exports = Atividade;