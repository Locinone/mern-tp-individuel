var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose")
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
var app = express();

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/tp-mern-solo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,

}).then(() => {
  console.log('[🥭]: Connexion à MongoDB réussie');
}).catch((error) => {
  console.log('[🥭]: Erreur de connexion à MongoDB :', error.message);
});

app.use(logger('dev'));
app.use(express.json());
// Enable CORS for all routes
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', userRoutes)
app.use('/api', productRoutes)


module.exports = app;
