const express = require('express');
const authController = require('../controllers/authController');
const userSchema = require('../service/validations/schemas/userSchema');
const validate = require('../service/validations/validate');

const router = new express.Router();

router.post('/register', validate(userSchema), authController.register);
router.post('/login', authController.login);
router.post('/refreshToken', authController.refreshToken);

module.exports = router;
