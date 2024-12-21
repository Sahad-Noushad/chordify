const express = require('express')
const {SignUp, LogIn, Data_fetching, Albums} = require('../controllers/authController');
const router = express.Router();

router.post('/signup',SignUp)
router.post('/login',LogIn)
router.get('/',Data_fetching)
router.get('/album',Albums)

module.exports = router