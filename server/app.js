require('dotenv').config(); // só pra garantir também

const express = require('express');
const cors = require('cors');

console.log('JWT_SECRET no app.js:', process.env.JWT_SECRET); // DEBUG

// resto do código...

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

app.use(cors()); // ✅ Habilita CORS antes das rotas
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.get('/', (req, res) => res.send('TagMe API funcionando'));

module.exports = app;
