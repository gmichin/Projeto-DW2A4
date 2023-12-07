const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', require('./routes/users')); 

app.get('/', (req, res) => {
  console.log('Acessando a rota /');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/topTracks', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'topTracks.html'));
});

app.get('/recommendedTracks', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'recommendedTracks.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando: http://localhost:${port}/}`);
});
