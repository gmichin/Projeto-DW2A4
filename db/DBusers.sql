CREATE DATABASE your_music;

USE your_music;

drop database your_music;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    token VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DELIMITER //
CREATE TRIGGER generate_token_before_insert
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    SET NEW.token = SUBSTRING(MD5(RAND()), 1, 10);
END;
//
DELIMITER ;


-- Inserir um usuário comprador ativo
INSERT INTO users (nome, email, senha)
VALUES ('João Silva', 'joao@example.com', 'senha123');

-- Inserir um usuário vendedor ativo
INSERT INTO users (nome, email, senha)
VALUES ('Maria Santos', 'maria@example.com', 'senha456');