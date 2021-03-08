const express = require('express');
const router = express.Router();


const sauceCtrl = require('../controllers/sauce');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, multer,sauceCtrl.getSauces);
router.get('/:id', auth, multer,sauceCtrl.getOneSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, multer, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, multer, sauceCtrl.likeSauce);
module.exports = router;