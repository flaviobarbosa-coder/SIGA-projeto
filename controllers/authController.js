const Utilizador = require('../models/Utilizador');
const bcrypt = require('bcryptjs');

exports.mostrarLogin = (req, res) => {
  res.render('auth/login', {
    erro: req.flash('erro'),
    sucesso: req.flash('sucesso')
  });
};

exports.fazerLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const utilizador = await Utilizador.findOne({ where: { email } });
    if (!utilizador) {
      req.flash('erro', 'Email ou password incorretos!');
      return res.redirect('/auth/login');
    }
    if (utilizador.estado === 'bloqueado') {
      req.flash('erro', 'Conta bloqueada! Contacte o administrador.');
      return res.redirect('/auth/login');
    }
    const passwordCorreta = await bcrypt.compare(password, utilizador.password);
    if (!passwordCorreta) {
      const tentativas = utilizador.tentativas_login + 1;
      if (tentativas >= 3) {
        await utilizador.update({ estado: 'bloqueado', tentativas_login: tentativas });
        req.flash('erro', 'Conta bloqueada apos 3 tentativas!');
      } else {
        await utilizador.update({ tentativas_login: tentativas });
        req.flash('erro', 'Password incorreta! Tentativa ' + tentativas + ' de 3');
      }
      return res.redirect('/auth/login');
    }
    await utilizador.update({ tentativas_login: 0 });
    req.session.utilizador = {
      id: utilizador.id,
      nome: utilizador.nome,
      email: utilizador.email,
      perfil: utilizador.perfil
    };
    switch (utilizador.perfil) {
      case 'admin': return res.redirect('/dashboard');
      case 'gestor_associados': return res.redirect('/dashboard');
      case 'gestor_financeiro': return res.redirect('/dashboard');
      case 'gestor_atividades': return res.redirect('/dashboard');
      case 'direcao': return res.redirect('/dashboard');
      case 'associado': return res.redirect('/dashboard');
      default: return res.redirect('/dashboard');
    }
  } catch (err) {
    console.error('ERRO:', err.message);
    req.flash('erro', 'Erro: ' + err.message);
    res.redirect('/auth/login');
  }
};

exports.fazerLogout = (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
};