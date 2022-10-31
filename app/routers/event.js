const express = require('express');
const eventController = require('../controllers/eventController');
const eventSchema = require('../service/validations/schemas/eventSchema');
const validate = require('../service/validations/validate');
const { setDecodedToken } = require('../middleware/access');

const router = new express.Router();

router.get('/events', eventController.getAllEvents);
router.get('/events/:id', setDecodedToken, eventController.getOneEvent);
router.post('/events', setDecodedToken, validate(eventSchema), eventController.createEvent);
router.put('/events/:id', setDecodedToken, eventController.updateEvent);
router.delete('/events/:id', setDecodedToken, eventController.deleteEvent);

module.exports = router;
