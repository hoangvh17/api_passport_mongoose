const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/:id', userController.detailUser);
router.put('/:id', userController.editDetailUser);




module.exports = router;