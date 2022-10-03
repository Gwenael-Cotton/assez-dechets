const express = require('express');

const authController = require('../controllers/authController');

const eventController = require('../controllers/eventController');

const router = express.Router();

router.get('/', (req, res) => res.send('Welcome'));

router.post('/register', authController.register);

router.get('/events', eventController.getAllEvents);

router.post('/events', eventController.createEvent);

module.exports = router;
