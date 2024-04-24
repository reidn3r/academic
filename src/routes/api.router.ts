import { Router } from 'express';

//routes
import { Login } from '../controllers/api/api.login';
import { FetchCities } from '../controllers/api/api.get-city';
import { FetchCourses } from '../controllers/api/api.get-undergrad-courses';
import { Register } from '../controllers/api/api.register';
import { CreateProfile } from '../controllers/api/api.create-profile';
import { BuildSearchURL } from '../controllers/api/api.search';
import { CreateProject } from '../controllers/api/api.create-project';
import { EditProject } from '../controllers/api/api.edit-project';
import { RemoveProject } from '../controllers/api/api.delete-project';

//middleware
import { MulterConfig } from '../config/multer-config';
import { checkAuthenticationAtLogin } from '../middleware/check-if-authenticated-at-login.auth';

const router: Router = Router();
router.post('/login', checkAuthenticationAtLogin, Login);
router.post('/register/user', Register);


router.post('/search', BuildSearchURL);
router.post('/courses', FetchCourses);
router.post('/city', FetchCities);

router.post('/create', MulterConfig.single('profile-image'), CreateProfile);

router.post('/create/project', MulterConfig.array('imageInput', 3) ,CreateProject);
router.put('/edit/project', MulterConfig.array('ImageFile', 3),EditProject);
router.delete('/delete/project', RemoveProject);

// router.post('/create/contacts', require('../controllers/api/api.profileContacts'));
// router.post('/create/project', MulterConfig.array('imageInput', 3) ,require('../controllers/api/api.createProject'));
// router.put('/edit/profile', MulterConfig.array('ImageFile', 1), require('../controllers/api/api.editProfile'));



// ja tava comentado router.post('/edit/profile', MulterConfig.array('ImageFile', 1), require('../controllers/api/api.editProfile'));

module.exports = router;