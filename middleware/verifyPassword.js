const passwordSchema = require('../models/password');

module.exports = (req, res, next) => {
    if(!passwordSchema.validate(req.body.password)){
        console.log('Mot de passe trop faible')
        return res.status(401).json({ error: 'Mot de passe trop faible'})
    } else{
        next();
    }
};