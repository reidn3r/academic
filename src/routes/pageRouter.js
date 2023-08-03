const express = require('express');
const router = express.Router();

router.get('/', require('../controllers/homeController'));
router.get('/login', require('../controllers/loginController'));
router.get('/logout', require('../controllers/logoutController'));

router.get('/register', require('../controllers/registerController').registerPage);
router.post('/register', require('../controllers/registerController').registerController);

router.get('/register/user', require('../controllers/registerHandler').registerUserController);
router.get('/register/company', require('../controllers/registerHandler').registerCompanyController);

router.get('/profile/:id', (req, res) => {
    res.status(200).redirect('/');
})

router.get('*', (req, res) => {
    res.redirect('/v1');
})

module.exports = router;