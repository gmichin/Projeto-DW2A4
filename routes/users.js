const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const db = require('../db');

class User {
  // Método para visualizar todos os perfis de usuário
  static viewAllProfiles(req, res) {
    const query = 'SELECT * FROM users';

    db.query(query, (err, result) => {
      if (err) {
        console.error('Erro ao obter dados do banco de dados:', err);
        res.status(500).json({ error: 'Erro ao obter dados do banco de dados.' });
      } else {
        res.json(result);
      }
    });
  }

  // Método para login de usuários
  static async loginUser(req, res) {
    const { email, senha } = req.body;
    console.log('\n\nEmail:', email);
    console.log('Senha:', senha);

    try {
      const response = await fetch('http://localhost:3000/users/data');
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados dos usuários');
      }
      const usersData = await response.json();
      const user = usersData.find((user) => user.email === email && user.senha === senha);
      if (user) {
        const userToken = user.token;
        res.redirect(`http://localhost:3000/profile?token=${userToken}`);
      } else {
        res.status(401).send('Autenticação falhou');
      }
    } catch (error) {
      console.error('Erro:', error.message);
      res.status(500).send('Erro interno do servidor');
    }
  }

  // Método para editar perfil de usuário por token
  static editUserProfile(req, res) {
    const token = req.params.token;
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }
    const query = `UPDATE users SET nome=?, email=?, senha= ? WHERE token=?`;

    db.query(query, [nome, email, senha, token], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Erro ao editar perfil do usuário.' });
      } else {
        res.json({ message: 'Perfil de usuário editado com sucesso.' });
      }
    });
  }

  // Método para deletar perfil pelo token
  static deleteUserProfile(req, res) {
    const userToken = req.params.token;
    const query = 'DELETE FROM users WHERE token = ?';

    db.query(query, [userToken], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Erro ao excluir o perfil do usuário.' });
      } else {
        res.json({ message: 'Perfil de usuário excluído com sucesso.' });
      }
    });
  }

  // Método para cadastrar usuários
  static signupUser(req, res) {
    const { nome, email, senha } = req.body;
    const query = 'INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)';
    db.query(query, [nome, email, senha], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
      } else {
        res.json({ message: 'Usuário cadastrado com sucesso.' });
      }
    });
  }
}

// Rotas
router.get('/data', User.viewAllProfiles);
router.post('/login', User.loginUser);
router.put('/:token', User.editUserProfile);
router.delete('/:token', User.deleteUserProfile);
router.post('/signup', User.signupUser);

// Exporta o router
module.exports = router;
