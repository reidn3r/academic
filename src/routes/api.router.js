const express = require('express');
const router = express.Router();

router.post('/register/user', require('../controllers/api/api.registerController').registerUser);
router.post('/register/company', require('../controllers/api/api.registerController').registerCompany);

router.post('/login', require('../controllers/loginController').loginController);

module.exports = router;