const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

const FILE_PATH = path.join(__dirname, 'comentarios.json');

if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, JSON.stringify([]));
}

app.get('/api/comentarios', (req, res) => {
  const dados = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
  res.json(dados);
});

app.post('/api/comentarios', (req, res) => {
  const { nome, mensagem } = req.body;

  if (!nome || !mensagem) {
    return res.status(400).json({ erro: 'Nome e mensagem são obrigatórios' });
  }

  const novoComentario = {
    nome,
    mensagem,
    data: new Date().toLocaleString('pt-BR')
  };

  const comentarios = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
  comentarios.push(novoComentario);
  fs.writeFileSync(FILE_PATH, JSON.stringify(comentarios, null, 2));

  res.status(201).json(novoComentario);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
