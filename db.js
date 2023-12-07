const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'gustavo',
  password: process.env.DB_PASSWORD || 'juliemei2014',
  database: process.env.DB_DATABASE || 'your_music',
});


db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  }
  console.log('Conectado ao banco de dados MySQL');
});


module.exports = db;