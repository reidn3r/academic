const express = require('express');
const router = express.Router();
const verifyLogin = require('../middleware/verifyLogin.auth');

router.post('/register/user', require('../controllers/api/api.registerController').registerUser);
router.post('/register/company', require('../controllers/api/api.registerController').registerCompany);

router.post('/login', verifyLogin, require('../controllers/loginController').loginController);

module.exports = router;