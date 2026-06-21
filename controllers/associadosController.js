const Associado = require('../models/Associado');

// Mostrar formulário de candidatura
exports.formulario = (req, res) => {
  res.render('associados/formulario', {
    messages: {
      success: req.flash('success'),
      error: req.flash('error')
    }
  });
};

// Submeter candidatura
exports.submeter = async (req, res) => {
  try {
    await Associado.create({
      nome: req.body.nome,
      tipo: req.body.tipo,
      email: req.body.email,
      telefone: req.body.telefone,
      nif: req.body.nif,
      morada: req.body.morada,
      estado: 'submetida'
    });
    req.flash('success', 'Candidatura submetida com sucesso!');
    res.redirect('/associados/lista');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao submeter candidatura.');
    res.redirect('/associados/formulario');
  }
};

// Listar todos os associados
exports.listar = async (req, res) => {
  try {
    const associados = await Associado.findAll();
    res.render('associados/lista', {
      associados,
      messages: {
        success: req.flash('success'),
        error: req.flash('error')
      }
    });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
};

// Ver detalhes de um associado
exports.detalhes = async (req, res) => {
  try {
    const associado = await Associado.findByPk(req.params.id);
    res.render('associados/detalhes', {
      associado,
      messages: {
        success: req.flash('success'),
        error: req.flash('error')
      }
    });
  } catch (err) {
    console.error(err);
    res.redirect('/associados/lista');
  }
};

// Aprovar candidatura
exports.aprovar = async (req, res) => {
  try {
    await Associado.update(
      { estado: 'aprovada' },
      { where: { id: req.params.id } }
    );
    req.flash('success', 'Associado aprovado com sucesso!');
    res.redirect('/associados/lista');
  } catch (err) {
    console.error(err);
    res.redirect('/associados/lista');
  }
};

// Rejeitar candidatura
exports.rejeitar = async (req, res) => {
  try {
    await Associado.update(
      { estado: 'rejeitada' },
      { where: { id: req.params.id } }
    );
    req.flash('success', 'Candidatura rejeitada.');
    res.redirect('/associados/lista');
  } catch (err) {
    console.error(err);
    res.redirect('/associados/lista');
  }
};