const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_PATH = path.join(__dirname, 'avaliacoes.json');

app.use(express.static('public'));
app.use(express.json());

if (!fs.existsSync(DATA_PATH)) {
  fs.writeFileSync(DATA_PATH, JSON.stringify([]));
}

app.get('/api/avaliacoes', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  const media = data.length ? data.reduce((soma, v) => soma + v, 0) / data.length : 0;
  res.json({ media: media.toFixed(2), total: data.length });
});

app.post('/api/avaliar', (req, res) => {
  const { nota } = req.body;
  if (nota < 1 || nota > 5) {
    return res.status(400).json({ erro: 'Nota inválida' });
  }

  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  data.push(nota);
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  res.status(201).json({ mensagem: 'Avaliação salva' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
