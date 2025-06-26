const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app = express();
const PORT = 3000;

const storiesFile = path.join(__dirname, 'stories.json');
const upload = multer({ dest: 'public/uploads/' });

app.use(express.static('public'));
app.use(express.json());

if (!fs.existsSync(storiesFile)) {
  fs.writeFileSync(storiesFile, JSON.stringify([]));
}

function getValidStories() {
  const data = JSON.parse(fs.readFileSync(storiesFile, 'utf-8'));
  const agora = new Date();
  return data.filter(story => {
    const storyDate = new Date(story.timestamp);
    const diff = (agora - storyDate) / (1000 * 60 * 60);
    return diff <= 24;
  });
}

app.get('/api/stories', (req, res) => {
  res.json(getValidStories());
});

app.post('/api/story', (req, res) => {
  const { texto } = req.body;
  if (!texto) return res.status(400).json({ erro: 'Texto é obrigatório' });

  const stories = getValidStories();
  stories.push({ tipo: 'texto', conteudo: texto, timestamp: new Date() });
  fs.writeFileSync(storiesFile, JSON.stringify(stories, null, 2));
  res.status(201).json({ mensagem: 'Story salvo' });
});

app.post('/api/story-img', upload.single('imagem'), (req, res) => {
  if (!req.file) return res.status(400).json({ erro: 'Imagem obrigatória' });

  const stories = getValidStories();
  stories.push({ tipo: 'imagem', conteudo: `/uploads/${req.file.filename}`, timestamp: new Date() });
  fs.writeFileSync(storiesFile, JSON.stringify(stories, null, 2));
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
