import express from 'express';
const router = express.Router();

import { LoginPage } from '../controllers/frontend/login';
import { Logout } from '../controllers/frontend/logout';
import { RegisterPage } from '../controllers/frontend/register-page';
import { RegisterUserPage } from '../controllers/frontend/register-user-page';
import { InitRegister } from '../controllers/frontend/save-init-register-data';
import { GetUserProfile } from '../controllers/frontend/get-user-profile';
import { Main } from '../controllers/frontend/home-controller';

import { checkIfUserIsAuthorizedToGetProfilePage } from '../middleware/check-if-user-is-authorized-profile.auth';
import { checkAuthenticationAtLogin } from '../middleware/check-if-authenticated-at-login.auth';
import { jwtAuth } from '../middleware/login.auth';
import checkAuth from '../middleware/chekAuth.auth';


router.get('/', jwtAuth, Main);
router.get('/login', checkAuthenticationAtLogin, LoginPage);

router.get('/logout', Logout);

router.get('/register', checkAuthenticationAtLogin, RegisterPage);
router.post('/register', InitRegister);
router.get('/register/user', RegisterUserPage);

router.get('/create/', require('../controllers/frontend/createProfileController'));
router.get('/create/contacts', require('../controllers/frontend/profileContactsController'));

router.get('/profile/:id', checkIfUserIsAuthorizedToGetProfilePage, GetUserProfile);
// router.get('/profile/:id/projects', checkIfUserIsAuthenticatedToGetProfilePage, require('../controllers/frontend/profileProjectsController'));
// router.get('/profile/:id/edit/:project_id', [checkIfUserIsAuthenticatedToGetProfilePage, checkAuth], require('../controllers/frontend/editProjectController'));
// router.get('/profile/:id/edit', [checkIfUserIsAuthenticatedToGetProfilePage, checkAuth], require('../controllers/frontend/editProfileController'));

// router.get('/search', checkIfUserIsAuthenticatedToGetProfilePage,require('../controllers/frontend/searchController'));

// router.get('/chat/render', require('../controllers/frontend/renderMessagesController'));
// router.get('/chat/get/contacts/:id', require('../controllers/frontend/getUserContactsController'));
// router.get('/messages/:from_id/:to_id',require('../controllers/api/api.messages'));

// router.get('*', require('../controllers/frontend/pageNotFound'));

module.exports = router;