const express = require('express');
const router = express.Router();

//Entrave les attaques par force brute
const limiter = require('../middleware/limiterConfig')

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', limiter.limiterConfig, userCtrl.login)

module.exports = router;