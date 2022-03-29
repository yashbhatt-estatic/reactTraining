var express = require('express');
var router = express.Router();
var userController = require('./../controllers/user.controller');

router.get('/', userController.getUser);

router.get('/:id', userController.getUserById);

router.post('/', userController.createUser);

router.patch('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

//Soft delete
// router.put('/soft/:id', userController.softDelete);

module.exports = router;
