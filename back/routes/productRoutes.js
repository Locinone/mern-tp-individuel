const express = require('express');
const productRoutes = express.Router();
const productController = require('../controllers/productController');

// Route pour ajouter un utilisateur
productRoutes.post('/products', productController.addProduct);

// Route pour récupérer tous les utilisateurs
productRoutes.get('/products', productController.getProducts);

// Route pour supprimer un utilisateur par ID
productRoutes.delete('/products/:id', productController.deleteProduct);

productRoutes.put('/products/:id', productController.updateProduct)

module.exports = productRoutes;