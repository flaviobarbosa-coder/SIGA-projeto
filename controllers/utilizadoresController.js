const Utilizador = require('../models/Utilizador');
const bcrypt = require('bcryptjs');
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');

exports.listar = async (req, res) => {
  try {
    const utilizadores = await Utilizador.findAll();
    res.render('utilizadores/index', { utilizadores });
  } catch (err) {
    res.send('Erro: ' + err.message);
  }
};

exports.mostrarCriar = (req, res) => {
  res.render('utilizadores/criar', {
    erro: req.flash('erro'),
    sucesso: req.flash('sucesso')
  });
};

exports.criar = async (req, res) => {
  try {
    const { nome, email, password, perfil } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await Utilizador.create({ nome, email, password: hash, perfil });
    req.flash('sucesso', 'Utilizador criado com sucesso!');
    res.redirect('/utilizadores');
  } catch (err) {
    req.flash('erro', 'Erro: ' + err.message);
    res.redirect('/utilizadores/criar');
  }
};

exports.mostrarEditar = async (req, res) => {
  try {
    const utilizador = await Utilizador.findByPk(req.params.id);
    if (!utilizador) return res.send('Utilizador nao encontrado');
    res.render('utilizadores/editar', { utilizador });
  } catch (err) {
    res.send('Erro: ' + err.message);
  }
};

exports.editar = async (req, res) => {
  try {
    const { nome, email, perfil, estado } = req.body;
    await Utilizador.update(
      { nome, email, perfil, estado },
      { where: { id: req.params.id } }
    );
    req.flash('sucesso', 'Utilizador atualizado!');
    res.redirect('/utilizadores');
  } catch (err) {
    res.send('Erro: ' + err.message);
  }
};

exports.eliminar = async (req, res) => {
  try {
    await Utilizador.destroy({ where: { id: req.params.id } });
    req.flash('sucesso', 'Utilizador eliminado!');
    res.redirect('/utilizadores');
  } catch (err) {
    res.send('Erro: ' + err.message);
  }
};

exports.mostrarRecuperarPassword = (req, res) => {
  res.render('utilizadores/recuperar-password', {
    erro: req.flash('erro'),
    sucesso: req.flash('sucesso')
  });
};

exports.recuperarPassword = async (req, res) => {
  try {
    const { email, nova_password } = req.body;
    const utilizador = await Utilizador.findOne({ where: { email } });
    if (!utilizador) {
      req.flash('erro', 'Email nao encontrado!');
      return res.redirect('/utilizadores/recuperar-password');
    }
    const hash = await bcrypt.hash(nova_password, 10);
    await utilizador.update({
      password: hash,
      estado: 'ativo',
      tentativas_login: 0
    });
    req.flash('sucesso', 'Password redefinida com sucesso!');
    res.redirect('/utilizadores');
  } catch (err) {
    req.flash('erro', 'Erro: ' + err.message);
    res.redirect('/utilizadores/recuperar-password');
  }
};

exports.logAuditoria = async (req, res) => {
  try {
    const logs = await sequelize.query(
      'SELECT * FROM log_auditoria ORDER BY data_hora DESC',
      { type: QueryTypes.SELECT }
    );
    res.render('utilizadores/log-auditoria', { logs });
  } catch (err) {
    res.send('Erro: ' + err.message);
  }
};

exports.registarLog = async (utilizador_id, acao, ip) => {
  try {
    await sequelize.query(
      'INSERT INTO log_auditoria (utilizador_id, acao, ip) VALUES (?, ?, ?)',
      {
        replacements: [utilizador_id, acao, ip],
        type: QueryTypes.INSERT
      }
    );
  } catch (err) {
    console.error('Erro ao registar log:', err.message);
  }
};
