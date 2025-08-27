# Backend - API de Veículos

Este é o backend da aplicação de gerenciamento de veículos, construído com Node.js e Express.

## Funcionalidades

- CRUD completo para veículos com os campos:
  - id
  - placa
  - chassi
  - renavam
  - modelo
  - marca
  - ano

## Como rodar o projeto

### Pré-requisitos

- Node.js instalado v22.18.0 ([https://nodejs.org/](https://nodejs.org/))

### Instalação

1. Clone este repositório:

   git clone https://github.com/evelynmatos/Veiculos-app.git

2. Entre na pasta do backend:

    cd backend

3. Instale as dependências:

    npm install

4. Inicie o servidor:

    npm start

## O servidor vai rodar em http://localhost:3000

Endpoints disponíveis: 
GET - Listar todos os veículos
GET (:id) - Buscar veículo por ID
POST - Criar um novo veículo
PUT - Atualizar veículo por ID
DELETE - Remover veículo por ID

