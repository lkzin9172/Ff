// bypass-server | Node.js + Express | Deploy: Render.com
// Linguagem: JavaScript (Node.js)

const express = require('express');
const cors    = require('cors');
const bypass  = require('./routes/bypass');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// rotas do bypass
app.use('/bypass', bypass);

// health check — Render usa isso pra saber se o server ta vivo
app.get('/', (req, res) => {
  res.json({ status: 'online', server: 'bypass-server', version: '1.0.0' });
});

app.listen(PORT, () => {
  console.log(`[bypass-server] rodando na porta ${PORT}`);
});
