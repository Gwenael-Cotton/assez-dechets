const express = require('express');
const userController = require('../controllers/userController');
// const { checkUserIsLogged } = require('../middleware/access');

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.get('/users/user', userController.getOneUser);

module.exports = router;
