const express = require('express');
const userRoutes = express.Router();
const userController = require('../controllers/userController');

// Route pour ajouter un utilisateur
userRoutes.post('/users', userController.addUser);

// Route pour récupérer tous les utilisateurs
userRoutes.get('/users', userController.getUsers);

// Route pour supprimer un utilisateur par ID
userRoutes.delete('/users/:id', userController.deleteUser);

userRoutes.put('/users/:id', userController.updateUser)

userRoutes.post('/token', userController.loginUser)


module.exports = userRoutes;