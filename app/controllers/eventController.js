const models = require('../models/database');

const eventController = {
  getAllEvents: async (req, res) => {
    try {
      const events = await models.Event.findAll();
      return res.json(events);
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: 'Internal server error' });
    }
  },

  createEvent: async (req, res) => {
    try {
      const eventToCreate = await models.Event.create({
        place: req.body.place,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
        status: req.body.status,
        weight: req.body.weight,
        creatorId: req.body.creatorId,
      });

      return res.status(201).send(eventToCreate);
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: 'Internal server error' });
    }
  },
};

module.exports = eventController;
