const pool = require('./db');

// 🔹 Fonction pour récupérer un stagiaire par ID
async function getUserById(userId) {
  try {
    const [rows] = await pool.execute('SELECT * FROM stagiaires WHERE id = ?', [userId]);
    if (rows.length === 0) {
      return { success: false, message: "Aucun stagiaire trouvé avec cet ID." };
    }
    return { success: true, data: rows[0] };
  } catch (error) {
    return handleDatabaseError(error);
  }
}

// 🔹 Fonction pour récupérer un stagiaire et paginations
async function getUsers(limit,offset) {
  try {
  
    const [rows] = await pool.execute('SELECT * FROM stagiaires    limit ? offset ?', [limit,offset]);
    if (rows.length === 0) {
      return { success: false, message: "Aucun stagiaire trouvé avec cet ID." };
    }
    return { success: true, data: rows };
  } catch (error) {
    return handleDatabaseError(error);
  }
}

// 🔹 Fonction pour créer un stagiaire
async function createUser(nom, prenom, email, telephone) {
  try {
    if (!nom || !prenom || !email || !telephone) {
      return { success: false, message: "Tous les champs sont obligatoires." };
    }

    const [result] = await pool.execute(
      'INSERT INTO stagiaires (nom, prenom, email, telephone) VALUES (?, ?, ?, ?)',
      [nom, prenom, email, telephone]
    );

    if (!result.insertId) {
      return { success: false, message: "Échec de l'insertion du stagiaire." };
    }

    return await getUserById(result.insertId);
  } catch (error) {
    return handleDatabaseError(error);
  }
}

// 🔹 Fonction pour mettre à jour un stagiaire
async function updateUser(userId, nom, prenom, email, telephone) {
  try {
    if (!nom || !prenom || !email || !telephone) {
      return { success: false, message: "Tous les champs sont obligatoires." };
    }

    const [result] = await pool.execute(
      'UPDATE stagiaires SET nom = ?, prenom = ?, email = ?, telephone = ? WHERE id = ?',
      [nom, prenom, email, telephone, userId]
    );

    if (result.affectedRows === 0) {
      return { success: false, message: "Aucun stagiaire mis à jour. Vérifiez l'ID." };
    }

    return await getUserById(userId);
  } catch (error) {
    return handleDatabaseError(error);
  }
}

// 🔹 Fonction pour supprimer un stagiaire
async function deleteUser(userId) {
  try {
    const [result] = await pool.execute('DELETE FROM stagiaires WHERE id = ?', [userId]);

    if (result.affectedRows === 0) {
      return { success: false, message: "Aucun stagiaire supprimé. Vérifiez l'ID." };
    }

    return { success: true, message: "Stagiaire supprimé avec succès." };
  } catch (error) {
    return handleDatabaseError(error);
  }
}

// 🔹 Gestion des erreurs SQL (Empêche l'affichage en console)
function handleDatabaseError(error) {
  let errorMessage = "Une erreur est survenue.";

  if (error.code === 'ER_DUP_ENTRY') {
    errorMessage = "Le téléphone ou l'email est déjà utilisé.";
  } else if (error.code === 'ER_BAD_NULL_ERROR') {
    errorMessage = "Tous les champs sont obligatoires.";
  } else if (error.code === 'ER_NO_REFERENCED_ROW_2') {
    errorMessage = "Référence invalide dans la base de données.";
  }

  return { success: false, message: errorMessage };
}





// 🔹 Gestion des erreurs SQL (Empêche l'affichage en console)
function handleDatabaseError(error) {
  let errorMessage = "Une erreur est survenue.";

  if (error.code === 'ER_DUP_ENTRY') {
    errorMessage = "Le téléphone ou l'email est déjà utilisé.";
  } else if (error.code === 'ER_BAD_NULL_ERROR') {
    errorMessage = "Tous les champs sont obligatoires.";
  } else if (error.code === 'ER_NO_REFERENCED_ROW_2') {
    errorMessage = "Référence invalide dans la base de données.";
  }

  return { success: false, message: errorMessage };
}

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };

