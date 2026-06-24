const fs = require('fs');
const path = 'controllers/financeiroController.js';
let conteudo = fs.readFileSync(path, 'utf8');

const novaFuncao = `exports.mostrarCriarPagamento = (req, res) => {
    res.render('financeiro/criar-pagamento');
};

`;

conteudo = conteudo.replace('exports.criarPagamento', novaFuncao + 'exports.criarPagamento');
fs.writeFileSync(path, conteudo, 'utf8');
console.log('Funcao adicionada com sucesso!');
