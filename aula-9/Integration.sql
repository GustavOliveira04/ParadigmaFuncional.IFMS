-- Feito no MySQL

CREATE DATABASE tads;

use tads;

CREATE TABLE pessoa(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    profissao VARCHAR(100)
);

