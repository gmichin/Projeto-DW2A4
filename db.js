const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'gustavo',
  password: 'juliemei2014',
  database: 'your_music',
  connectionLimit: 10, 
});


db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  }
  console.log('Conectado ao banco de dados MySQL');
});


module.exports = db;