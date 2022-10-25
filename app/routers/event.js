const express = require('express');
const eventController = require('../controllers/eventController');
const eventSchema = require('../service/validations/schemas/eventSchema');
const validate = require('../service/validations/validate');
// const { checkUserIsLogged } = require('../middleware/access');

const router = new express.Router();

router.get('/events', eventController.getAllEvents);
router.get('/events/:id', eventController.getOneEvent);
router.post('/events', validate(eventSchema), eventController.createEvent);
router.put('/events/:id', eventController.updateEvent);
router.delete('/events/:id', eventController.deleteEvent);

module.exports = router;
