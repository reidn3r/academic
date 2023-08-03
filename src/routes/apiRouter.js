const express = require('express');
const router = express.Router();

router.post('/register/user', require('../controllers/apiRegisterController').registerUser);
router.post('/register/company', require('../controllers/apiRegisterController').registerCompany);

module.exports = router;    