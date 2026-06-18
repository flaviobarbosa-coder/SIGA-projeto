const Utilizador = require('../models/Utilizador');
const bcrypt = require('bcryptjs');

exports.listar = async (req, res) => {
  try {
    const utilizadores = await Utilizador.findAll();
    res.render('utilizadores/index', { utilizadores });
  } catch (err) {
    console.error(err);
    res.send('Erro ao listar utilizadores');
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
    req.flash('erro', 'Erro ao criar utilizador: ' + err.message);
    res.redirect('/utilizadores/criar');
  }
};

exports.mostrarEditar = async (req, res) => {
  try {
    const utilizador = await Utilizador.findByPk(req.params.id);
    if (!utilizador) {
      return res.send('Utilizador não encontrado');
    }
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