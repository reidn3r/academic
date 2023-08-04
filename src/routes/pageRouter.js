const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.get('/', auth, require('../controllers/homeController'));

router.get('/login', require('../controllers/loginController').login);

router.get('/logout', require('../controllers/logoutController'));

router.get('/register', require('../controllers/registerController').registerPage);
router.post('/register', require('../controllers/registerController').registerMainController);

router.get('/register/user', require('../controllers/registerController').registerUserController);
router.get('/register/company', require('../controllers/registerController').registerCompanyController);

router.get('/create', require('../controllers/createProfileController'));

/* -------- */
router.get('/profile/:id', (req, res) => {
    res.status(200).redirect('/');
})

router.get('*', (req, res) => {
    res.redirect('/v1');
})

module.exports = router;