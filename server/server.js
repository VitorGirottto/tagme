require('dotenv').config();  // chama dotenv aqui também só pra garantir

const app = require('./app');
const port = process.env.PORT || 4000;

console.log('JWT_SECRET no server.js:', process.env.JWT_SECRET); // DEBUG

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
