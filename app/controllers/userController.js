const { omit } = require('ramda');
const { USER_NOT_FOUND } = require('../constants');
const models = require('../models/database');

const userController = {
  getAllUsers: async (_, res) => {
    try {
      const user = await models.User.findAll();
      console.log(user.dataValues);
      omit(['password'], user.dataValues);
      return res.json(user);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  },

  getOneUser: async (req, res) => {
    try {
      let user = await models.User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).send({ error: USER_NOT_FOUND });
      }
      user = omit(['password'], user.dataValues);
      return res.json(user);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  },

  updateNumberOfParticip: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await models.User.update(
        { numberParticipations: req.body.numberParticipations },
        { where: { id } },
      );

      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = userController;
