const express = require('express');
const userController = require('../controllers/userController');
const { checkUserIsLogged } = require('../middleware/access');

const router = express.Router();

router.get('/users', checkUserIsLogged, userController.getAllUsers);

module.exports = router;
