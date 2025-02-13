const express = require('express');
const userRoutes = require('./userRoutes');

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware pour parser le JSON
app.use('/users', userRoutes); // Ajout des routes utilisateurs

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});

