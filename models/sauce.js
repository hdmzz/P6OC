const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, require: true},
    manufacturer: {type: String, require: true},
    description: {type: String, require: true},
    mainPepper: {type: String, require: true},
    imageUrl: {type: String, require: true},
    heat: {type: Number, require: true},
    likes: {type: Number, require: true},
    dislikes: {type: Number, require: true},
    usersLiked: {type: Array, required: true},
    usersDisliked: {type: Array, required: true},
});

module.exports = mongoose.model('Sauce', sauceSchema);