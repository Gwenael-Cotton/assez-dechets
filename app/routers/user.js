const express = require('express');
const userController = require('../controllers/userController');
const { setDecodedToken } = require('../middleware/access');

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.get('/users/user', setDecodedToken, userController.getOneUser);

module.exports = router;
