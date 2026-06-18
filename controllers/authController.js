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
  console.log('1. Tentativa de login:', email);
  try {
    const utilizador = await Utilizador.findOne({ where: { email } });
    console.log('2. Utilizador encontrado:', utilizador ? 'sim' : 'nao');
    if (!utilizador) {
      req.flash('erro', 'Email ou password incorretos!');
      return res.redirect('/auth/login');
    }
    console.log('3. Estado:', utilizador.estado);
    if (utilizador.estado === 'bloqueado') {
      req.flash('erro', 'Conta bloqueada!');
      return res.redirect('/auth/login');
    }
    console.log('4. A verificar password...');
    const passwordCorreta = await bcrypt.compare(password, utilizador.password);
    console.log('5. Password correta:', passwordCorreta);
    if (!passwordCorreta) {
      req.flash('erro', 'Password incorreta!');
      return res.redirect('/auth/login');
    }
    console.log('6. A criar sessao...');
    await utilizador.update({ tentativas_login: 0 });
    req.session.utilizador = {
      id: utilizador.id,
      nome: utilizador.nome,
      email: utilizador.email,
      perfil: utilizador.perfil
    };
    console.log('7. Perfil:', utilizador.perfil);
    switch (utilizador.perfil) {
      case 'admin': return res.redirect('/utilizadores');
      case 'gestor_associados': return res.redirect('/associados');
      case 'gestor_financeiro': return res.redirect('/financeiro');
      case 'gestor_atividades': return res.redirect('/atividades');
      case 'direcao': return res.redirect('/dashboard');
      case 'associado': return res.redirect('/associados/portal');
      default: return res.redirect('/');
    }
  } catch (err) {
    console.error('ERRO COMPLETO:', err);
    req.flash('erro', 'Erro: ' + err.message);
    res.redirect('/auth/login');
  }
};

exports.fazerLogout = (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
};
