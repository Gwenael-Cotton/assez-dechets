const express = require('express');

// const authController = require('../controllers/authController');
const { verifyAccessToken } = require('../helpers/jwtHelpers');

const authController = require('../controllers/authController');

const eventController = require('../controllers/eventController');

const router = express.Router();

router.get('/', (req, res) => res.send('Welcome'));

router.get('/events', eventController.getAllEvents);
router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/events', eventController.getAllEvents);
router.get('/events/:id', eventController.getOneEvent);
router.post('/events', verifyAccessToken, eventController.createEvent);
router.put('/events/:id', eventController.updateEvent);
router.delete('/events/:id', eventController.deleteEvent);

// endpoint /refresh-tokens

module.exports = router;
