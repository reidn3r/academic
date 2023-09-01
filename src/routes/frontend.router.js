const authJwt = require('../middleware/login.auth');
const verifyLogin = require('../middleware/verifyLogin.auth');
const express = require('express');
const router = express.Router();

router.get('/', authJwt, require('../controllers/frontend/homeController'));

router.get('/login', verifyLogin, require('../controllers/frontend/loginController'));
router.get('/logout', require('../controllers/frontend/logoutController'));

router.get('/register', require('../controllers/frontend/registerController').registerPage);
router.post('/register', require('../controllers/frontend/registerController').registerMainController);
router.get('/register/user', require('../controllers/frontend/registerController').registerUserController);

router.get('/create', require('../controllers/frontend/createProfileController'));
router.get('/create/contacts', require('../controllers/frontend/profileContactsController'));

router.get('/profile/:id', require('../controllers/frontend/getProfileController'));
router.get('/profile/:id/projects', require('../controllers/frontend/profileProjectsController'));
router.get('/profile/:id/edit/:project_id', require('../controllers/frontend/editProjectController'));

router.get('*', (req, res) => {
    res.redirect('/v1');
})

module.exports = router;