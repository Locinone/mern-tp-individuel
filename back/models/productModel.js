const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nom: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: false },
    image: { type: String, required: false }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;