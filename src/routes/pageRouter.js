const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    res.status(200).json({message: 'main'});
})

router.get('/login', (req, res) => {
    res.status(200).json({message: 'login'})
})

router.get('/logout', (req, res) => {
    res.status(200).redirect('/');
})

router.get('/register', require('../controllers/registerController').registerPage);
router.post('/register', require('../controllers/registerController').registerController);

router.get('/register/user', require('../controllers/registerHandler').registerUserController);
router.get('/register/company', require('../controllers/registerHandler').registerCompanyController);

router.post('/api/register/user', require('../controllers/apiRegisterController').registerUser);
router.post('/api/register/company', require('../controllers/apiRegisterController').registerCompany);

router.get('/profile/:id', (req, res) => {
    res.status(200).redirect('/');
})

router.get('*', (req, res) => {
    res.redirect('/v1');
})

module.exports = router;