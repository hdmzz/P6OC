const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
    .then (() => res.status(201).json({ message: 'Sauce enregistrée'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getSauces = (req, res, next) => {
    Sauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }))
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400) ({error}))
};

exports.modifySauce = (req, res, next) => {
    if (req.file) {
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    const sauceObject = {
                        ...JSON.parse(req.body.sauce),
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
                    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
                        .catch(error => res.status(400).json({ error }));
                })
            })
            .catch(error => res.status(500).json({ error }));
    } else {
        const sauceObject = { ...req.body };
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
            .catch(error => res.status(400).json({ error }));
    }
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'La sauce a été supprimée !'}))
        .catch(error => res.status(400).json({ error }));
    });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.likeSauce = (req, res, next) => {
    const userId = req.body.userId;
    const like = req.body.like;
    const sauceId = req.params.id;
    Sauce.findById({_id: sauceId})
    .then(sauce => {
        const newValues = {
            usersLiked: sauce.usersLiked,
            usersDisliked: sauce.usersDisliked,
            likes: 0,
            dislikes: 0
        }
        switch(like) {
            case 1:
                newValues.usersLiked.push(userId);
            break;
            case -1:
                newValues.usersDisliked.push(userId);
            break;
            case 0:
                if (newValues.usersLiked.includes(userId)){
                    const index = newValues.usersLiked.indexOf(userId);
                    newValues.usersLiked.splice(index, 1);
                } else {
                    const index = newValues.usersDisliked.indexOf(userId);
                    newValues.usersDisliked.splice(index, 1);
                }
            break;
            default:
                throw error;   
        }
        newValues.likes = newValues.usersLiked.length;
        newValues.dislikes = newValues.usersDisliked.length;

         Sauce.updateOne({_id: sauceId}, newValues)
         .then(() => res.status(200).json({message: 'Sauce notée'}))
         .catch(error => res.status(400).json({ error }));
    }) 
    .catch(error => res.status(400).json({ error }))
};

