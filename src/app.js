
const express = require('express');

const app = express();
app.disable('x-powered-by');

// Middleware pour lire les requêtes JSON
app.use(express.json());
app.use(express.static('public'));

// Route de vérification
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'API is running'
    });
});


const db = require('./db');

app.get('/users/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ erreur: 'id invalide' });
  }

  const { rows } = await db.query(
    'SELECT id, nom FROM users WHERE id = $1',
    [id]
  );

  if (!rows[0]) {
    return res.status(404).json({ erreur: 'introuvable' });
  }

  res.json(rows[0]);
});
module.exports = app;
