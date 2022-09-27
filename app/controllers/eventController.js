// const sequelize = require('sequelize');
// const DataTypes = require('sequelize/lib/data-types');

const Event = require('../models/event');
// const db = require('../database');

module.exports = {
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.findAll();
      return res.render('events', events);
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: 'Internal server error' });
    }
  },

  createEvent: async (req, res) => {
    try {
      const eventToCreate = await Event.create({
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
