-- Criação do banco de dados
CREATE DATABASE ehm_solucoes;

-- Conectar ao banco de dados criado
\c ehm_solucoes

-- Tabela para armazenar usuários
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para contatos
CREATE TABLE contatos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mensagem TEXT NOT NULL,
    recebido_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para informações financeiras (exemplo simplificado)
CREATE TABLE financeiro (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    tipo VARCHAR(10) CHECK (tipo IN ('entrada', 'saida')) NOT NULL,
    valor NUMERIC(10, 2) NOT NULL,
    data_registro DATE DEFAULT CURRENT_DATE
);

-- Tabela para histórico de eventos ou registros da empresa
CREATE TABLE historia (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    data_evento DATE NOT NULL
);

-- Tabela para recursos MRP
CREATE TABLE mrp (
    id SERIAL PRIMARY KEY,
    recurso VARCHAR(255) NOT NULL,
    quantidade INT NOT NULL,
    data_requisicao DATE NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pendente', 'em andamento', 'concluido')) DEFAULT 'pendente'
);

-- Tabela SIPOC (Supplier, Input, Process, Output, Customer)
CREATE TABLE sipoc (
    id SERIAL PRIMARY KEY,
    fornecedor VARCHAR(255) NOT NULL,
    insumo VARCHAR(255) NOT NULL,
    processo VARCHAR(255) NOT NULL,
    produto VARCHAR(255) NOT NULL,
    cliente VARCHAR(255) NOT NULL
);
