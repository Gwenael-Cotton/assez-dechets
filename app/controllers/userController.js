const models = require('../models/database');

const userController = {
  getAllUsers: async (_, res) => {
    try {
      const users = await models.User.findAll();
      return res.json(users);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  },
};

module.exports = userController;
