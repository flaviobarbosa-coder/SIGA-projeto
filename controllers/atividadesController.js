const Atividade = require("../models/Atividade");

exports.listar = async (req, res) => {
  try {
    const atividades = await Atividade.findAll();
    res.render("atividades/index", { atividades });
  } catch (err) {
    res.send("Erro: " + err.message);
  }
};

exports.mostrarCriar = (req, res) => {
  res.render("atividades/criar", {
    erro: req.flash("erro"),
    sucesso: req.flash("sucesso")
  });
};

exports.criar = async (req, res) => {
  try {
    const { nome, tipo, descricao, data, vagas } = req.body;
    await Atividade.create({ nome, tipo, descricao, data, vagas });
    req.flash("sucesso", "Atividade criada com sucesso!");
    res.redirect("/atividades");
  } catch (err) {
    req.flash("erro", "Erro ao criar atividade: " + err.message);
    res.redirect("/atividades/criar");
  }
};

exports.mostrarEditar = async (req, res) => {
  try {
    const atividade = await Atividade.findByPk(req.params.id);
    if (!atividade) return res.send("Atividade nao encontrada");
    res.render("atividades/editar", { atividade });
  } catch (err) {
    res.send("Erro: " + err.message);
  }
};

exports.editar = async (req, res) => {
  try {
    const { nome, tipo, descricao, data, vagas, estado } = req.body;
    await Atividade.update(
      { nome, tipo, descricao, data, vagas, estado },
      { where: { id: req.params.id } }
    );
    req.flash("sucesso", "Atividade atualizada!");
    res.redirect("/atividades");
  } catch (err) {
    res.send("Erro: " + err.message);
  }
};

exports.eliminar = async (req, res) => {
  try {
    await Atividade.destroy({ where: { id: req.params.id } });
    req.flash("sucesso", "Atividade eliminada!");
    res.redirect("/atividades");
  } catch (err) {
    res.send("Erro: " + err.message);
  }
};