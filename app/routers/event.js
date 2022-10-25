const express = require('express');
const eventController = require('../controllers/eventController');
const eventSchema = require('../service/validations/schemas/eventSchema');
const validate = require('../service/validations/validate');
const { checkUserIsLogged } = require('../middleware/access');

const router = new express.Router();

router.get('/events', eventController.getAllEvents);
router.get('/events/:id', checkUserIsLogged, eventController.getOneEvent);
router.post('/events', checkUserIsLogged, validate(eventSchema), eventController.createEvent);
router.put('/events/:id', checkUserIsLogged, eventController.updateEvent);
router.delete('/events/:id', checkUserIsLogged, eventController.deleteEvent);

module.exports = router;
