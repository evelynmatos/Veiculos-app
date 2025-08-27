const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

const FILE_PATH = "./veiculos.json";
const PORT = process.env.PORT || 3000;

// Função auxiliar para ler dados
function readData() {
  const data = fs.readFileSync(FILE_PATH);
  return JSON.parse(data);
}

// Função auxiliar para salvar dados
function writeData(data) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

// IMPLEMENTAÇÃO DO CRUD

// GET - Listar todos veículo
app.get("/veiculos", (req, res) => {
  const veiculos = readData();
  res.json(veiculos);
});

// GET - Obter veículo por ID
app.get("/veiculos/:id", (req, res) => {
  const veiculos = readData();
  const veiculo = veiculos.find((v) => v.id === parseInt(req.params.id));
  if (!veiculo) return res.status(404).send("Veículo não encontrado");
  res.json(veiculo);
});

// POST - Criar novo veículo
app.post("/veiculos", (req, res) => {
  const veiculos = readData();
  const novo = { id: Date.now(), ...req.body };
  veiculos.push(novo);
  writeData(veiculos);
  res.status(201).json(novo);
});

// PUT - Atualizar veículo
app.put("/veiculos/:id", (req, res) => {
  const veiculos = readData();
  const index = veiculos.findIndex((v) => v.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Veículo não encontrado");
  veiculos[index] = { ...veiculos[index], ...req.body };
  writeData(veiculos);
  res.json(veiculos[index]);
});

// DELETE - Remover veículo
app.delete("/veiculos/:id", (req, res) => {
  let veiculos = readData();
  const index = veiculos.findIndex((v) => v.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Veículo não encontrado");
  const removido = veiculos.splice(index, 1);
  writeData(veiculos);
  res.json(removido[0]);
});

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
