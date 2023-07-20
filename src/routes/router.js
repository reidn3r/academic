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

router.post('/register', require('../controllers/registerController'));

router.get('/profile/:id', (req, res) => {
    res.status(200).redirect('/');
})

module.exports = router;