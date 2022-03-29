var express = require('express');
var router = express.Router();
var authentication = require('../middleware/authentication');
const multer = require('multer');
var userController = require('./../controllers/user.controller');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        const filename = Date.now();
        cb(null, filename + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/register', upload.any('profile_pic'), userController.createUser);

router.post('/login', userController.loginUser);

/* GET users listing. */
router.get('/', authentication, userController.getUser);

router.put('/update/:id', authentication, upload.any('profile_pic'), userController.updateUser);

router.put('/soft/:id', authentication, userController.softDelete);

router.delete('/delete/:id', authentication, userController.deleteUser);

module.exports = router;