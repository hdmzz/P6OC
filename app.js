const express = require('express');
//Logging des info des requêtes
const morgan = require('morgan');
//xss-clean 
const xss = require('xss-clean');
//Dotenve variable environement
require('dotenv').config();
//Body-parser
const bodyParser = require('body-parser');
//Helmet protection des headers
const helmet = require('helmet');
//Mongoose
const mongoose = require('mongoose');
//Routes user et sauce
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

const app = express();
//Path pour multer
const path = require('path');

//Connection base de données
mongoose.connect(process.env.MONGODB_PATH,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));
//Logging de toutes les requêtes dans la console
app.use(morgan('combined'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
//Helmet et xss-clean protection
app.use(helmet());
app.use(xss())


//Routes 
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
  

module.exports = app;