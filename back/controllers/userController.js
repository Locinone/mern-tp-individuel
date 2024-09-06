const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Ajouter un utilisateur
exports.addUser = async (req, res) => {
    try {
        
        // Check if user already exists
        const {email, password, nom, prenom, age} = new User(req.body);
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'Email already in use' });
        }
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            email: email,
            password: hashedPassword,
            nom: nom,
            prenom: prenom,
            age: age
        });
        await user.save();

        // Create JWT token
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'Utilisateur ajouté avec succès',"access": token, user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Récupérer tous les utilisateurs
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Supprimer un utilisateur par ID
// utiliser la méthode findbyidanddelete
// Supprimer un utilisateur par ID
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log("id", userId)
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const userChange = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, userChange, { new: true });
        console.log(updatedUser)
        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ message: 'Utilisateur mis à jour avec succès', user: updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Authenticate user (login)
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Create and return JWT token
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', "access": token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};