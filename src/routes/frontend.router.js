const authJwt = require('../middleware/login.auth');
const verifyLogin = require('../middleware/verifyLogin.auth');
const express = require('express');
const router = express.Router();

router.get('/', authJwt, require('../controllers/homeController'));

router.get('/login', verifyLogin, require('../controllers/loginController'));
router.get('/logout', require('../controllers/logoutController'));

router.get('/register', require('../controllers/registerController').registerPage);
router.post('/register', require('../controllers/registerController').registerMainController);

router.get('/register/user', require('../controllers/registerController').registerUserController);
// router.get('/register/company', require('../controllers/registerController').registerCompanyController);

router.get('/create', require('../controllers/createProfileController'));

router.get('/profile/:id', require('../controllers/getProfileController'));

router.get('*', (req, res) => {
    res.redirect('/v1');
})

module.exports = router;