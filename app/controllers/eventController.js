const models = require('../models/database');

const eventController = {
  getAllEvents: async (_, res) => {
    try {
      const events = await models.Event.findAll();
      return res.json(events);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  },

  getOneEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const event = await models.Event.findByPk(id);
      if (!event) {
        return res.status(404).send({ error: 'Event not found' });
      }
      return res.json(event);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  },

  createEvent: async (req, res) => {
    try {
      const today = new Date();

      const startDateMustBeAfterToday = new Date(req.body.startDate) > today;

      const endDateMustBeAfterStartDate = new Date(req.body.endDate) > new Date(req.body.startDate);

      if (!startDateMustBeAfterToday) {
        return res.status(400).send({ error: 'You must create an event in the future' });
      }

      if (!endDateMustBeAfterStartDate) {
        return res.status(400).send({ error: 'End date must be after start date' });
      }

      const eventToCreate = await models.Event.create({
        title: req.body.title,
        place: req.body.place,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
        status: req.body.status,
        weight: req.body.weight,
        creatorId: req.body.creatorId,
      });

      return res.status(201).json(eventToCreate);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  },

  updateEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await models.Event.update(req.body, {
        where: { id },
      });
      if (updated) {
        const updatedEvent = await models.Event.findByPk(id);
        return res.status(200).json(updatedEvent);
      }
      throw new Error('Event not found');
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  },

  deleteEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const eventToDelete = await models.Event.findByPk(id);
      if (!eventToDelete) {
        return res.status(404).send({ error: 'Event not found' });
      }

      await eventToDelete.destroy();
      return res.status(200).json({ message: 'Event deleted' });
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  },
};

module.exports = eventController;
