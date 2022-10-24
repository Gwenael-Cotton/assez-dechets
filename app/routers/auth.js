const express = require('express');
const authController = require('../controllers/authController');
const userRegisterSchema = require('../service/validations/schemas/userRegisterSchema');
const validate = require('../service/validations/validate');

const router = new express.Router();

router.post('/register', validate(userRegisterSchema), authController.register);
router.post('/login', authController.login);
router.post('/refreshToken', authController.refreshToken);
// router.post('/refreshToken', checkUserIsLogged, authController.refreshToken);

module.exports = router;
