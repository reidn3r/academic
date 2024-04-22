import { Router } from 'express';
import { Login } from '../controllers/api/api.login';
import { FetchCities } from '../controllers/api/api.get-city';
import { FetchCourses } from '../controllers/api/api.get-undergrad-courses';
import { Register } from '../controllers/api/api.register';
import { CreateProfile } from '../controllers/api/api.create-profile';
import { BuildSearchURL } from '../controllers/api/api.search';

import { MulterConfig } from '../config/multer-config';
import { checkAuthenticationAtLogin } from '../middleware/check-if-authenticated-at-login.auth';



const router: Router = Router();
router.post('/register/user', Register);

router.post('/login', checkAuthenticationAtLogin, Login);

router.post('/create', MulterConfig.single('profile-image'), CreateProfile);

router.post('/city', FetchCities);

router.post('/courses', FetchCourses);

router.post('/search', BuildSearchURL);

// router.post('/create/contacts', require('../controllers/api/api.profileContacts'));

// router.post('/create/project', MulterConfig.array('imageInput', 3) ,require('../controllers/api/api.createProject'));

// router.put('/edit/project', MulterConfig.array('ImageFile', 3), require('../controllers/api/api.editProject'));
// router.put('/edit/profile', MulterConfig.array('ImageFile', 1), require('../controllers/api/api.editProfile'));

// router.delete('/delete/project', require('../controllers/api/api.deleteProject'));


//  ja tava comentado router.post('/edit/project', MulterConfig.array('ImageFile', 3), require('../controllers/api/api.editProject'));
// ja tava comentado router.post('/edit/profile', MulterConfig.array('ImageFile', 1), require('../controllers/api/api.editProfile'));
// ja tava comentado  router.post('/delete/project', require('../controllers/api/api.deleteProject'));

module.exports = router;