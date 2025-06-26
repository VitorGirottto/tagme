const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

function getLikes() {
  const data = fs.readFileSync('likes.json', 'utf-8');
  return JSON.parse(data).likes;
}

app.get('/api/likes', (req, res) => {
  const likes = getLikes();
  res.json({ likes });
});

app.post('/api/like', (req, res) => {
  let likes = getLikes();
  likes += 1;
  fs.writeFileSync('likes.json', JSON.stringify({ likes }), 'utf-8');
  res.json({ likes });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


#
