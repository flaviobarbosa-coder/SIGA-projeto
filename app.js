const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const sequelize = require('./config/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'siga-secret-key',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

app.use('/auth', require('./routes/auth'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/utilizadores', require('./routes/utilizadores'));
app.use('/atividades', require('./routes/atividades'));
app.use('/financeiro', require('./routes/financeiro'));

app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

sequelize.authenticate()
  .then(() => console.log('Base de dados conectada!'))
  .catch(err => console.error('Erro na base de dados:', err));

app.listen(3000, () => {
  console.log('SIGA a correr em http://localhost:3000');
});