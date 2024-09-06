const Product = require('../models/productModel');

// Ajouter un utilisateur
exports.addProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ message: 'Utilisateur ajouté avec succès', product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Récupérer tous les utilisateurs
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Supprimer un utilisateur par ID
// utiliser la méthode findbyidanddelete
// Supprimer un utilisateur par ID
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        console.log("id", productId)
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const productChange = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(ProductId, productChange, { new: true });
        console.log(updatedProduct)
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ message: 'Utilisateur mis à jour avec succès', Product: updatedProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}