const express = require('express');
const router = express.Router();

const authJwt = require('../middleware/login.auth');
const verifyLogin = require('../middleware/verifyLogin.auth');
const verifyAuth = require('../middleware/verifyAuth.auth');

router.get('/', authJwt, require('../controllers/frontend/homeController'));

router.get('/login', verifyLogin, require('../controllers/frontend/loginController'));
router.get('/logout', require('../controllers/frontend/logoutController'));

router.get('/register', require('../controllers/frontend/registerController').registerPage);
router.post('/register', require('../controllers/frontend/registerController').registerMainController);
router.get('/register/user', require('../controllers/frontend/registerController').registerUserController);

router.get('/create/', require('../controllers/frontend/createProfileController'));
router.get('/create/contacts', require('../controllers/frontend/profileContactsController'));

router.get('/profile/:id', verifyAuth, require('../controllers/frontend/getProfileController'));
router.get('/profile/:id/projects', verifyAuth, require('../controllers/frontend/profileProjectsController'));
router.get('/profile/:id/edit/:project_id', verifyAuth, require('../controllers/frontend/editProjectController'));
router.get('/profile/:id/edit', verifyAuth, require('../controllers/frontend/editProfileController'));

router.get('/search', verifyAuth,require('../controllers/frontend/searchController'));

router.get('/chat/render', require('../controllers/frontend/renderMessagesController'));
router.get('/chat/get/contacts/:id', require('../controllers/frontend/getUserContactsController'));
router.get('/messages/:from_id/:to_id',require('../controllers/api/api.messages'));

router.get('*', require('../controllers/frontend/pageNotFound'));

module.exports = router;