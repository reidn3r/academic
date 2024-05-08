import express from 'express';
const router = express.Router();

import { LoginPage } from '../controllers/frontend/login';
import { Logout } from '../controllers/frontend/logout';
import { RegisterPage } from '../controllers/frontend/register-page';
import { RegisterUserPage } from '../controllers/frontend/register-user-page';
import { InitRegister } from '../controllers/frontend/save-init-register-data';
import { GetUserProfile } from '../controllers/frontend/get-user-profile';
import { Main } from '../controllers/frontend/home-controller';
import { SearchResults } from '../controllers/frontend/search-results';
import { ProfileProjects } from '../controllers/frontend/get-profile-projects';
import { EditProjects } from '../controllers/frontend/edit-project';
import { EditProfile } from '../controllers/frontend/edit-profile';
import { PageNotFound } from '../controllers/frontend/page-not-found';
import { ProfileContacts } from '../controllers/frontend/profile-contacts';

import { checkIfUserIsAuthorizedToGetProfilePage } from '../middleware/check-if-user-is-authorized-profile.auth';
import { checkAuthenticationAtLogin } from '../middleware/check-if-authenticated-at-login.auth';
import { jwtAuth } from '../middleware/login.auth';
import checkAuth from '../middleware/chekAuth.auth';


router.get('/', Main);
router.get('/login', LoginPage);
router.get('/logout', Logout);

router.get('/register', RegisterPage);
router.post('/register', InitRegister);
router.get('/register/user', RegisterUserPage);


router.get('/search', SearchResults);

router.get('/profile/:id', GetUserProfile);
router.get('/profile/:id/projects', ProfileProjects);
router.get('/profile/:id/edit', EditProfile);
router.get('/profile/:profileId/edit/:projectId', EditProjects);

router.get('/create/', require('../controllers/frontend/createProfileController'));
router.get('/create/contacts', ProfileContacts);
router.get('*', PageNotFound);

module.exports = router;