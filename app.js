const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

const app = express();

// Motor de templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'siga-secret-key',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

// Rota principal
app.get('/', (req, res) => {
  res.send('SIGA está a funcionar!');
});

app.listen(3000, () => {
  console.log('SIGA a correr em http://localhost:3000');
});