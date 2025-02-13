const express = require('express');
const { getUsers ,getUserById, createUser, updateUser, deleteUser } = require('./userService');

const router = express.Router();

// 🔹 Récupérer un stagiaire par ID
router.get('/:id', async (req, res) => {
  const response = await getUserById(req.params.id);
  return response.success ? res.json(response.data) : res.status(404).json(response);
});

// 🔹 Récupérer un stagiaire avec pagination
router.get('/:limit?/:offset?', async (req, res) => {
 
//let { limit, offset } = req.params;
let  limitNum;
let offsetNum;
 // const limitNum =  req.params.limit ? req.params.limit : 1;
 // const offsetNum = req.params.offset ? req.params.offset : 0;
  //const id = req.params.id || 0;
  if (!req.params.limit) { limitNum = 10;} else{ limitNum = req.params.limit;}
  console.log(limitNum);
    // Par défaut, 10 éléments par page
    if (!req.params.offset ){offsetNum = 0;} else{ offsetNum = req.params.offset;}
  
  
  const response = await getUsers(limitNum,offsetNum);
 

  return response.success ? res.json(response.data) : res.status(404).json(response);
});

// 🔹 Ajouter un stagiaire
router.post('/', async (req, res) => {
  const { nom, prenom, email, telephone } = req.body;
  const response = await createUser(nom, prenom, email, telephone);
  return response.success ? res.status(201).json(response.data) : res.status(400).json(response);
});

// 🔹 Mettre à jour un stagiaire
router.put('/:id', async (req, res) => {
  const { nom, prenom, email, telephone } = req.body;
  const response = await updateUser(req.params.id, nom, prenom, email, telephone);
  return response.success ? res.json(response.data) : res.status(400).json(response);
});

// 🔹 Supprimer un stagiaire
router.delete('/:id', async (req, res) => {
  const response = await deleteUser(req.params.id);
  return response.success ? res.json(response) : res.status(400).json(response);
});

module.exports = router;

