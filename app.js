const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

// ROTAS
const dashboardRoutes = require('./routes/dashboard');

const app = express();

// 📌 Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 📌 Middlewares básicos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 📌 Sessão
app.use(session({
  secret: 'siga-secret-key',
  resave: false,
  saveUninitialized: false
}));

// 📌 Flash messages
app.use(flash());

// 📌 ROTAS (IMPORTANTE: depois dos middlewares)
app.use('/dashboard', dashboardRoutes);

// 📌 Rota principal
app.get('/', (req, res) => {
  res.send('SIGA está a funcionar!');
});

// 📌 Iniciar servidor
app.listen(3000, () => {
  console.log('SIGA a correr em http://localhost:3000');
});