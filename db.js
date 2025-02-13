const mysql = require('mysql2/promise');

// Configuration du pool de connexion MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'paiement_institus',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;

