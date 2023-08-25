const multer = require('multer');
const express = require('express');
const path = require('path');
const router = express.Router();
const verifyLogin = require('../middleware/verifyLogin.auth');

const upload = multer({ storage: multer.memoryStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', '..', 'temp'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
}) });

router.post('/register/user', require('../controllers/api/api.registerController').registerUser);
router.post('/login', verifyLogin, require('../controllers/api/api.loginController'));
router.post('/create/contacts', require('../controllers/api/api.profileContacts'));
router.post('/create', upload.single('profile-image'), require('../controllers/api/api.createProfile'));

module.exports = router;