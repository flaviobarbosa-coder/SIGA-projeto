const fs = require('fs');
const path = 'routes/financeiro.js';
let conteudo = fs.readFileSync(path, 'utf8');

const novaRota = "router.get('/pagamentos/criar', financeiroController.mostrarCriarPagamento);\n";

conteudo = conteudo.replace(
  "router.post('/pagamentos/criar', financeiroController.criarPagamento);",
  novaRota + "router.post('/pagamentos/criar', financeiroController.criarPagamento);"
);

fs.writeFileSync(path, conteudo, 'utf8');
console.log('Rota adicionada com sucesso!');
