const {
  EVENT_NOT_FOUND,
  START_DATE_MUST_BE_AFTER_TODAY,
  END_DATE_MUST_BE_AFTER_START_DATE,
  EVENT_DELETED,
  USER_NOT_FOUND,
} = require('../constants');

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
        return res.status(404).send({ error: EVENT_NOT_FOUND });
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
        return res.status(400).send({ error: START_DATE_MUST_BE_AFTER_TODAY });
      }

      if (!endDateMustBeAfterStartDate) {
        return res.status(400).send({ error: END_DATE_MUST_BE_AFTER_START_DATE });
      }

      const eventToCreate = await models.Event.create({
        title: req.body.title,
        place: req.body.place,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
        status: req.body.status,
        weight: req.body.weight,
        userId: req.body.userId,
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
      throw new Error(EVENT_NOT_FOUND);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  },

  deleteEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const eventToDelete = await models.Event.findByPk(id);
      if (!eventToDelete) {
        return res.status(404).send({ error: EVENT_NOT_FOUND });
      }

      await eventToDelete.destroy();
      return res.status(200).json({ message: EVENT_DELETED });
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  },

  linkUserToEvent: async (req, res) => {
    try {
      const { eventId, userId } = req.params;
      const event = await models.Event.findByPk(eventId);
      if (!event) {
        return res.status(404).send({ error: EVENT_NOT_FOUND });
      }
      const user = await models.User.findByPk(userId);
      if (!user) {
        return res.status(404).send({ error: USER_NOT_FOUND });
      }

      const test = user.setDataValue('eventParticipation', eventId);
      console.log({ test });
      // const userParticipatingToEvent = await models.UserEvent.create({
      //   userId,
      //   eventId,
      // });

      // console.log({ userParticipatingToEvent });

      return res.status(201).json({ message: 'ok' });
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  },
};

module.exports = eventController;
